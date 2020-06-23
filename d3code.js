// To have options for filters on our vis we can have conditional classNames/outputs that 
// depend on variables that can act as flags for each attr below.
    // E.G:  
      // let flag = filter1
    // .attr(if (flag === filter1) return $$)

// IDEA; have a filter for recovery cases per capita in each state

const svg_width = 800;
const svg_height = 600;

let svg = d3.select(".viewbox")
  .append("svg")
  .attr("height", svg_height)
  .attr("width", svg_width)
  .append("g")
  .attr("transform", "translate(0,0)")

// we use the below #queue when we have multiple files for use
d3.queue() // allows us to be able to set gaps in time of execution(TOE)
  .defer(d3.csv, "data/csse_covid_19_data/csse_covid_19_daily_reports_us/06-20-2020.csv")
  // defer pretty much allows us halt execution of below until each file with a
      // #defer is loaded.
  .await(ready) // function that executes (below) upon load

  // note; d3's force sim works in ticks, meaning nodes don't just
    // "snap" into place
let sim = d3.forceSimulation()
  // it doesnt matter what we name x and y below because they are just 
    // placeholders
  .force("x", d3.forceX(svg_width / 2).strength(0.05))
  .force("y", d3.forceY(svg_height / 2).strength(0.05))
    // the collide measurement on line 35 & line 46 must match so that the force between  
      // center points of differing circles can be equal to each circles radius (if collision was smaller then circles
        // would overlap)
  .force("collide", d3.forceCollide(d => ( (Math.sqrt(d.Recovered) / 4 + 10) )) )
          

function ready (error, datapoints) {
  // datapoints are each object parsed by 
  let circles = svg.selectAll(".state")
    .data(datapoints)
    .enter()
    .append("circle")
    .attr("class", "state")
    .attr("r", d => (
      (Math.sqrt(d.Recovered) / 4 + 10)
    )) // our radius of our circles
    .attr("fill", "red")
    // .attr("border", "black").attr("border-width", 2)
    .attr("cx", 100) // svg attribute for x-axis center point
    .attr("cy", 300)
    .on('focus', d => (
      console.log(d)
    ))
    // references above https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx

    // perhaps the coolest thing ever! The d3.forceSimulation().nodes
      // creates points of origination(nodes) that create force against other elements(nodes)
      // reference:: https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c
      // reference:: https://github.com/d3/d3-force  <--- DENSEEEEE
    sim.nodes(datapoints)
      .on('tick', ticked)

  function ticked() {
    circles
      .attr("cx", d => {
        return d.x
      })
      .attr("cy", d => {
        return d.y
      })
  }
}

