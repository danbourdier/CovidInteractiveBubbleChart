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
let sim = d3.forceSimulation();

function ready (error, datapoints) {
  // datapoints are each object parsed by 
  let circles = svg.selectAll(".state")
    .data(datapoints)
    .enter()
    .append("circle")
    .attr("class", "state")
    .attr("r", 10)
    .attr("fill", "green")
    .attr("cx", 100)
    .attr("cy", 300)

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

