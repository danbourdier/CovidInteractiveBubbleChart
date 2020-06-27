// const state = require("./state_acronyms")

// console.log(states.states)

  let radioListener = document.querySelector("div.radio-button-div") 
  radioListener.addEventListener('click', e => {
    if (e.target.value) {
      d3.select("svg").remove();
    draw(e.target.value)
    }
  });

  function draw(filter) {
    // To have options for filters on our vis we can have conditional classNames/outputs that 
    // depend on variables that can act as flags for each attr below.
    // E.G:  
    // let flag = filter1
    // .attr(if (flag === filter1) return $$)

    // IDEA; have a filter for recovery cases per capita in each state
    const states = {
      "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
      "California": "CA", "Colorado": "CO", "Connecticut": "CT",
      "Delaware": "DE","Florida": "FL","Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
      "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", 
      "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA",
      "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", 
      "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", 
      "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", 
      "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", 
      "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", 
      "Tennessee": "TN", "Texas": "TX", "Utah": "UT",  "Vermont": "VT", "Virginia": "VA", 
      "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
    }

    const COLORS = ["lightsalmon", "mediumvioletred", "lightcoral", "orangered", "gold",
      "darkorange", "khaki", "yellow", "lawngreen", "limegreen", "greenyellow",
      "mediumseagreen", "cyan", "aquamarine", "mediumturquoise", "deepskyblue",
      "dodgerblue", "blue", "mediumslateblue", "fuchsia", "mediumpurple", "ivory",
      "brown", "tan", "slategray", "hotpink", "mediumspringgreen",
      "seagreen"]
    const svg_width = 1020;
    const svg_height = 695;

    let svg = d3.select(".viewbox")
      .append("svg")
      .attr("height", svg_height)
      .attr("width", svg_width)
    // ABOVE CODE REFERENCED FROM http://bl.ocks.org/wimdows/1502762

    // we use the below #queue when we have multiple files for use
    d3.queue() // allows us to be able to set gaps in time of execution(TOE)
      .defer(d3.csv, "data/csse_covid_19_data/csse_covid_19_daily_reports_us/06-20-2020.csv")
      // defer pretty much allows us halt execution of below until each file with a
      // #defer is loaded.
      .await(vis) // function that executes (below) upon load

    let forceStrength = 0.2;
    let forceXCombine = d3.forceX((svg_width - 70) / 2).strength(forceStrength);

    let forceXSplit = d3.forceX(d => {
      if (d.ISO3 === "true") {
        return 300
      } else {
        return 740
      }

    }).strength(forceStrength);

    const charge = d => {
      targetFilter = d[filter];
      return -Math.pow(d[filter], 0.78) * forceStrength
    }
    // above code references from D3's sample code for applying charge
    ////////////////////////
    // note; d3's force sim works in ticks, meaning nodes don't just
    // "snap" into place
    let sim = d3.forceSimulation()
      // it doesnt matter what we name x and y below because they are just 
      // placeholders
      .force("x", forceXCombine)
      .force("y", d3.forceY((svg_height - 95) / 2).strength(forceStrength))
      // the collide measurement on line 35 & line 46 must match so that the force between  
      // center points of differing bubbles can be equal to each circles radius (if collision was smaller then circles
      // would overlap)
      .force('charge', d3.forceManyBody().strength(charge))
    // the above code works better than collide alone!!! REPULSION FTW!!!
    sim
      .force("collide", d3.forceCollide(d => ( scale(d[filter]) )) )


    // let max = d3.max(data, function (d) { return +d.field_goal_attempts; });
    let scale = d3.scaleSqrt().domain([0, 100000]).range([10, 80])
    // the above code takes a max domain of expected values and proportionally sets it
      // to our range value
    function vis(error, datapoints) {
      let g = svg.selectAll("g")
        .data(datapoints)
        .enter()
        .append("g")
        // .attr("r", d => (
        //   scale(d[filter])
        // ))
        // .attr("transform", "translate(0,0)")


      let bubbles = svg.selectAll("g")
        .append("circle")
        .attr("class", "state")
        .attr("r", d => {
          // d[filter] = Math.floor(d[filter])
          if (states[d.Province_State]) {
            return scale( d[filter] )
          }
        }) // our radius of our bubbles

        .attr("fill", () => {
          return COLORS[Math.floor(Math.random() * COLORS.length - 1) + 1]
        })
        .attr("cx", () => {
          cxvar = 500
          return cxvar
        })
        .attr("cy", () => {
          cyvar = 500
          return cyvar
        })

        .on("click", d => {
          d.ISO3 = 'true'
          sim
            .force("x", forceXSplit)
            .alphaTarget(0.20)
            .restart()
          d.ISO3 = 'false'
          d3.event.stopPropagation()
        })

        d3.select("svg")
          .on("click", d => {
            // will have to reset flagged data on click
            d3.event.stopPropagation() // stops event from bubbling up
          })
      // references above https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx

      // perhaps the coolest thing ever! The d3.forceSimulation().nodes
      // creates points of origination(nodes) that create force against other elements(nodes)
      // reference:: https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c
      // reference:: https://github.com/d3/d3-force  <--- DENSEEEEE
      sim.nodes(datapoints)
        .on('tick', ticked)
 
      let words = svg.selectAll("g");
      words.append("text")
        .text(
          d => (states[d.Province_State] ? states[d.Province_State] : "")
          )
      // ( d.Province_State.length > 1 ? d.Province_State[0] + d.Province_State.split(" ")[d.Province_State.split(" ").length - 1[0]] : "welp" 

      let texts = svg.selectAll("text")

      function ticked() {
        bubbles
          .attr("cx", d => {
            cxvart = d.x;
            return d.x
          })
          .attr("cy", d => {
            cyvart = d.y;
            return d.y
          });

        texts
          .attr("x", d => {

            return d.x - 6
          })
          .attr("y", d => {

            return d.y
          })
          .style("font-size", d => {
            return (
              Math.floor(Math.sqrt(d[filter]) / 6 + 24) / 3.14)
            
          })
          .style("font-weight", "bold")
          .style("font-family", "Arial")
          .style("text-transform", "uppercase")
      }
      // our buttons to override the forcesim factors
      d3.select(".button-reset")
        .on("click", d => {
          sim
            .force("x", forceXCombine)
            .alphaTarget(0.20)
            // https://stackoverflow.com/questions/46426072/what-is-the-difference-between-alphatarget-and-alphamin
            .restart()
        });

      d3.select(".button-split")
        .on("click", () => (
          sim
            .force("x", forceXSplit)
            .alphaTarget(0.20)
            .restart()
        ));


    }

  }

draw("Recovered")
  


  ////////////////////////////////////////////////////////////////////////////////


  //                       AHA MOMENTS
  // 1. I spent all day debugging why small circles werent separated according to my conditional
    // its because i couldn't appropiately identify what each circle represented because
      // of the logic that sizes them defaults values < 200 to be equal to a relatively same 
        // size as opposed to other circles that had values of 70,000 (we need to add a scale!!!)

  // 2. Force charge over force collission because collision acts as barriers preventing
    // free flowing bubbles! Where as charge acts as a repulsion when set to a negative value!!!

  // 3. My ticked method and setting the individual text's positioning
