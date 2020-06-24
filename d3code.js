// To have options for filters on our vis we can have conditional classNames/outputs that 
// depend on variables that can act as flags for each attr below.
    // E.G:  
      // let flag = filter1
    // .attr(if (flag === filter1) return $$)

// IDEA; have a filter for recovery cases per capita in each state
const COLORS = ["lightsalmon", "red", "lightcoral", "orangered", "gold", 
  "darkorange", "khaki", "yellow", "lawngreen", "limegreen", "greenyellow",
   "mediumseagreen", "cyan", "aquamarine", "mediumturquoise", "deepskyblue",
    "dodgerblue", "blue", "navy", "mediumslateblue", "fuchsia", "indigo", "ivory",
     "lavenderblush", "brown", "tan", "slategray", "hotpink", "mediumspringgreen",
      "seagreen"]


const svg_width = 950;
const svg_height = 600;

let svg = d3.select(".viewbox")
  .append("svg")
  .attr("height", svg_height)
  .attr("width", svg_width)
  .append("g")
  .attr("transform", "translate(0,0)") // same as margins; just centers our viewbox

////////////////////////////////////////////
// let defs = svg.append("defs")

  //   <feComposite in2="offsetblur" operator="in" />
  //   <feMerge>
  //     <feMergeNode />
  //     <feMergeNode in="SourceGraphic" />
  //   </feMerge>
  // </filter >

// defs.append("filter")
//   .attr("id", "drop-shadow")
//   .append("feGaussianBlur")
//     .attr("id", "in")
//     .attr("stdDeviation", 0.5)
    // .append("feOffset")
    //   .attr("dx", 1)
    //   .attr("dy", 4)
      // .attr("result", "offsetblur")
      // .append("feFlood")
      //   .attr("flood-color", "white")
        // .append("feComposite")
        //   .attr("in2", "offsetblur")
        //   .attr("operator", "in")
          // .append("feMerge")
          //   .append("feMergeNode")
          //   .append("feMergeNode")
              // .attr("in", "SourceGraphic")

// var dropShadowFilter = defs.append('svg:filter')
//   .attr('id', 'drop-shadow')
//   .attr('filterUnits', "userSpaceOnUse")
//   .attr('width', '250%')
//   .attr('height', '250%');
// dropShadowFilter.append('svg:feGaussianBlur')
//   .attr('in', 'SourceGraphic')
//   .attr('stdDeviation', 2)
//   .attr('result', 'blur-out');
// dropShadowFilter.append('svg:feColorMatrix')
//   .attr('in', 'blur-out')
//   .attr('type', 'hueRotate')
//   .attr('values', 180)
//   .attr('result', 'color-out');
// dropShadowFilter.append('svg:feOffset')
//   .attr('in', 'color-out')
//   .attr('dx', 3)
//   .attr('dy', 3)
//   .attr('result', 'the-shadow');
// dropShadowFilter.append('svg:feBlend')
//   .attr('in', 'SourceGraphic')
//   .attr('in2', 'the-shadow')
//   .attr('mode', 'normal');
// ABOVE CODE REFERENCED FROM http://bl.ocks.org/wimdows/1502762
////////////////////////////////////////////////

// we use the below #queue when we have multiple files for use
d3.queue() // allows us to be able to set gaps in time of execution(TOE)
  .defer(d3.csv, "data/csse_covid_19_data/csse_covid_19_daily_reports_us/06-20-2020.csv")
  // defer pretty much allows us halt execution of below until each file with a
      // #defer is loaded.
  .await(ready) // function that executes (below) upon load



  

// let forceX = d3.forceX(svg_width / 2).strength(0.05)

let forceStrength = 0.5;

////////////////////////////////////////////////////////////////////////////////
let forceXCombine = d3.forceX(svg_width / 2).strength(forceStrength);

let forceXSplit= d3.forceX(d => {
  if (d.Lat > 30) {
    return 250
  } else if (d.Lat < 30) {
    return 750
  }

}).strength(forceStrength);

////////////////////////////////////////////////////////////////////////////////

const charge = d => {
  return -Math.pow(d.Recovered, 0.739) * forceStrength
  // return d.Recovered
}
// above code reference from D3's sample code for applying charge

// note; d3's force sim works in ticks, meaning nodes don't just
  // "snap" into place
let sim = d3.forceSimulation()
  // it doesnt matter what we name x and y below because they are just 
    // placeholders

  .force("x", forceXCombine)
  .force("y", d3.forceY(svg_height / 2).strength(forceStrength))
    // the collide measurement on line 35 & line 46 must match so that the force between  
      // center points of differing bubbles can be equal to each circles radius (if collision was smaller then circles
        // would overlap)

  // .force("collide", d3.forceCollide(d => ( Math.floor(Math.sqrt(d.Recovered) / 6 + 10) )) )

  .force('charge', d3.forceManyBody().strength(charge))

  
  // had to use sqrt to drastically shrink values over 10000 to proportion
          
////////////////////////////////////////////////////////////////////////////////

function ready (error, datapoints) {
  // datapoints are each object parsed by 
  let g = svg.selectAll("g")
    .append("g")
  let bubbles = svg.selectAll(".state")
    .data(datapoints)
    .enter()
    
    .append("circle")
    .attr("class", "state")
    .attr("r", d => (
      Math.floor(Math.sqrt(d.Recovered) / 6 + 10)
    )) // our radius of our bubbles
    .attr("fill", () => {
      return COLORS[Math.floor(Math.random() * COLORS.length - 1) + 1  ]
    })
    // .attr("border", "black").attr("border-width", 2)
    .attr("cx", 100) // svg attribute for x-axis center point
    .attr("cy", 300)
    
    .on('focus', d => (
      // sim.force("x", d3.forceX(250)).strength(0.5)
      console.log(d)
    ))

    g.append("text")
      .attr("dx", d => (-20))
      .text(d => (d.Province_State))
    // references above https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx

    // perhaps the coolest thing ever! The d3.forceSimulation().nodes
      // creates points of origination(nodes) that create force against other elements(nodes)
      // reference:: https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c
      // reference:: https://github.com/d3/d3-force  <--- DENSEEEEE
    sim.nodes(datapoints)
      .on('tick', ticked)


  function ticked() {
    bubbles
      .attr("cx", d => {
        return d.x
      })
      .attr("cy", d => {
        return d.y
      })
  }

  // our buttons to override the forcesim factors
  d3.select(".button-reset")
    .on("click", () => (
      sim
        .force("x", forceXCombine)
        .alphaTarget(0.20)
        // https://stackoverflow.com/questions/46426072/what-is-the-difference-between-alphatarget-and-alphamin
        .restart()
    ) );

  d3.select(".button-split")
    .on("click", () => (
      sim
        .force("x", forceXSplit)
        .alphaTarget(0.20)
        .restart()
    ));
}

// /////////////////////////////////////////////////////////////////////////////

