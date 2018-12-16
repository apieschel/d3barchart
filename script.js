/* globals d3 */
const w = 500
const h = 300;
const padding = 30;

const xScale = d3.scaleLinear()
                  .domain([0, 200])
                  .range([padding, w - padding]);
const xAxis = d3.axisBottom(xScale);

d3.select("body")
  .append("h1")
  .attr("id", "title")
  .text("GDP in the United States");

const svg = d3.select(".container")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis);;