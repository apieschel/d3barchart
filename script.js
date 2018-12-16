/* globals d3 */
let dataset = [];
const xhr = new XMLHttpRequest();
const callback = function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    dataset = data.data;
    console.log(dataset);
    let dates = [];
    let dates2 = [];
    
    for(let i = 0; i < dataset.length; i++) {
      dates.push(dataset[i][0].replace(/-/g, ".").substring(0, 7));
      dataset[i][0] = dataset[i][0].replace(/-/g, ".").substring(0, 7);
      dates2.push(d3.timeFormat(dates[i][0]));
    }
    console.log(dates);
    console.log(dates2);
    
    const w = 800
    const h = 400;
    const padding = 30;
    const minX = d3.min(dates, (d) => d);
    const maxX = d3.max(dates, (d) => d);
    const minY = d3.min(dataset, (d) => d[1]);
    const maxY = d3.max(dataset, (d) => d[1]);
    
    console.log(minX);
    console.log(maxX);
    console.log(minY);
    console.log(maxY);

    const xScale = d3.scaleLinear()
                      .domain([minX, maxX])
                      .range([padding, w - padding]);
    const yScale = d3.scaleLinear()
                         .domain([maxY, minY])
                         .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
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

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(d[0]))
      .attr("y", (d) => h - yScale(d[1]) - padding)
      .attr("width", 2)
      .attr("height", (d) => yScale(d[1]))
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1]);
  }
};

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
xhr.send();