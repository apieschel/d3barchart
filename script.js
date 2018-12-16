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
    let originalFormat = [];
    
    for(let i = 0; i < dataset.length; i++) {
      originalFormat.push(dataset[i][0]);
      dates.push(dataset[i][0].replace(/-/g, ".").substring(0, 7));
      let day = new Date(dataset[i][0]);
      dataset[i][2] = day;
      dates2.push(day);
    }
    console.log(dates);
    console.log(dates2);
    
    const w = 1200
    const barWidth = w/275;
    const h = 750;
    const padding = 40;
    const minX = d3.min(dates2, (d) => d);
    const maxX = d3.max(dates2, (d) => d);
    const minY = d3.min(dataset, (d) => d[1]);
    const maxY = d3.max(dataset, (d) => d[1]);
    
    console.log(minX);
    console.log(maxX);
    console.log(minY);
    console.log(maxY);

    const xScale = d3.scaleTime()
                      .domain([minX, maxX])
                      .range([padding, w - padding]);
    const yScale = d3.scaleLinear()
                         .domain([0, maxY])
                         .range([h - padding, 0]);
    
    const gdpScale = d3.scaleLinear()
                         .domain([0, maxY])
                         .range([0, h - padding]);

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
        .attr("transform", "translate(" + padding + ", 0)")
        .attr("id", "y-axis")
        .call(yAxis);

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(d[2]))
      .attr("y", (d) => h - gdpScale(d[1]) - padding)
      .attr("width", barWidth)
      .attr("height", (d) => gdpScale(d[1]))
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("fill", "purple")
    
    /*
    svg.selectAll("div")
       .data(dataset)
       .enter()
       .append("div")
       .attr("class", "tooltip")
       .attr("data-date", (d) => d[0])
       .text((d) => d[0] + " " + d[1]);
    */
    
     svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       // Add your code below this line
       .attr("x", (d, i) => xScale(d[2]) + 5)
       .attr("y", (d, i) => h - d[1]);
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