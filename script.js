/* globals d3 */
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
xhr.responseType = 'json';
xhr.onload = function() {
  var status = xhr.status;
  if (status === 200) {
    callback(null, xhr.response);
  } else {
    callback(status, xhr.response);
  }
};
hr.send();

const w = 500
const h = 300;
const padding = 30;

const xScale = d3.scaleLinear()
                  .domain([0, 200])
                  .range([padding, w - padding]);
const yScale = d3.scaleLinear()
                     .domain([0, 300])
                     .range([h - padding, padding]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

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
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(0," + (w - padding) + ")")
    .attr("id", "y-axis")
    .call(yAxis);