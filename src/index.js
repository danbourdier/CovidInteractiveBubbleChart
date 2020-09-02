  let radioListener = document.querySelector("div.radio-button-div") 
  radioListener.addEventListener('click', e => {
    if (e.target.value) {
      d3.select("svg").remove();
    draw(e.target.value)
    }
  });

  let resetRight = document.getElementById("reset-button-right");

  resetRight.addEventListener("click", () => {
    d3.select("svg").remove();
    draw("Recovered")
  });
  
  let helpBox = document.getElementById("help-box")
  let helpBoxContainer = document.getElementById("help-box-container")
  // helpBox.innerText = ""


  function draw(filter) {
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

    const COLORS = ["#ee6407", "#585481", "#279af1", "#1C5D99", "#ffffff"];
    
    const svg_width = 920;
    const svg_height = 695;

    let svg = d3.select(".viewbox")
      .append("svg")
      .attr("height", svg_height)
      .attr("width", svg_width)

    // we use the below #queue when we have multiple files for use
    d3.queue() // allows us to be able to set gaps in time of execution(TOE)
      .defer(d3.csv, "./src/06-20-2020.csv")
      // defer pretty much allows us halt execution of below until each file with a
      // #defer is loaded.
      .await(vis) // function that executes (below) upon load

    let forceStrength = 0.2;
    let forceXCombine = d3.forceX((svg_width + 30) / 2).strength(forceStrength);

    let forceXSplit = d3.forceX(d => {
      if (d.ISO3 === "true") {
        return 300
      } else {
        return 625
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
      g
        .append("g")

      let bubbles = svg.selectAll("g")
        .append("circle")
        .attr("class", "state")
        .attr("r", d => {
          d[filter] = Math.floor(d[filter])
          if (states[d.Province_State]) {
            return scale( d[filter] )
          }
        }) 
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
          // d3.event.stopPropagation()
          document.getElementById(`Province_State`)
            .innerText = d.Province_State;
          document.getElementById(`Recovered`)
            .innerText = Number(d.Recovered);
          document.getElementById(`Confirmed`)
            .innerText = d.Confirmed;
          document.getElementById(`Deaths`)
            .innerText = Number(d.Deaths);
          document.getElementById(`Active`)
            .innerText = Number(d.Active);
          document.getElementById(`Incident_Rate`)
            .innerText = Number(d.Incident_Rate).toFixed(2);
          document.getElementById(`People_Tested`)
            .innerText = Number(d.People_Tested).toFixed(2);
          document.getElementById(`People_Hospitalized`)
            .innerText = Number(d.People_Hospitalized);
          document.getElementById(`Mortality_Rate`)
            .innerText = Number(d.Mortality_Rate).toFixed(2);
          document.getElementById(`Testing_Rate`)
            .innerText = Number(d.Testing_Rate).toFixed(2);
          document.getElementById(`Hospitalization_Rate`)
            .innerText = Number(d.Hospitalization_Rate).toFixed(2);
        })

      // d3 mouseover events

      d3.select(".header-links")
        .on("mouseover", () => {
          helpBox.innerHTML = "Google 10 non-tax related reasons to hire a Veteran!"
          helpBoxContainer
            // .style.backgroundColor = "lightgreen"
            .style.boxShadow = "0px 10px 40px 20px lightgreen"
          
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
          helpBoxContainer
            .style.boxShadow = "0px 0px 0px 0px #A3B1C6 inset, 0px 0px 0px 0px #ffffff inset"
        })

      d3.select(".left-text-area")
        .on("mouseover", () => {
          helpBox.innerHTML = "Window showing state COVID statistics"
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
        })
        
      d3.select("#reset-button-right")
        .on("mouseover", () => {
          helpBox.innerHTML = "Click to reset bubble proportions"
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
        })

      d3.select(".radio-button-div")
        .on("mouseover", () => {
          helpBox.innerHTML = "Click any button to size bubbles by selection"
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
        })

      d3.select(".button-reset")
        .on("mouseover", () => {
          helpBox.innerHTML = "Click to reset state data"
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
        })

      d3.select("svg")
        .on("mouseover", () => {
          helpBox.innerHTML = "Click on a state to view it's content on the left-hand side"
        })
        .on("mouseout", () => {
          helpBox.innerHTML = "The Interactive COVID-19 chart renders visualizations based on live data of COVID affected states. Hover over any section for a tip"
        })
      // d3 mouseover events above



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
      
      d3.selectAll(".button-reset")
        .on("click", d => {
          sim
            .force("x", forceXCombine)
            .alphaTarget(0.20)
            // https://stackoverflow.com/questions/46426072/what-is-the-difference-between-alphatarget-and-alphamin
            .restart()
          document.getElementById(`Province_State`)
            .innerText = "Select a State";
          document.getElementById(`Recovered`)
            .innerText = "Select a State";
          document.getElementById(`Confirmed`)
            .innerText = "Select a State";
          document.getElementById(`Deaths`)
            .innerText = "Select a State";
          document.getElementById(`Active`)
            .innerText = "Select a State";
          document.getElementById(`Incident_Rate`)
            .innerText = "Select a State";
          document.getElementById(`People_Tested`)
            .innerText = "Select a State";
          document.getElementById(`People_Hospitalized`)
            .innerText = "Select a State";
          document.getElementById(`Mortality_Rate`)
            .innerText = "Select a State";
          document.getElementById(`Testing_Rate`)
            .innerText = "Select a State";
          document.getElementById(`Hospitalization_Rate`)
            .innerText = "Select a State";

        });

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
