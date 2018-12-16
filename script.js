/* globals d3 */
const w = 500
const h = 300;
const padding = 30;

d3.select("body")
  .append("h1")
  .attr("id", "title")
  .text("GDP in the United States");

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);;