import { Component, OnInit } from '@angular/core';
declare const d3: any;

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css']
})
export class D3Component implements OnInit {


  temperatures: any[];
  months: any;
  margin: any;
  fullWidth: any;
  fullHeight: any;
  width: any;
  height: any;
  svg: any;
  monthScale: any;
  bandwidth: any;
  maxTemp: any;
  tempScale: any;
  xAxis: any;
  yAxis: any;
  yAxisEle: any;
  yText: any;
  barHolder: any;
  bars: any;
  converter: any;
  isCelsius: any;

  constructor() {

    this.temperatures = [
      {temp: 32, month: 'January'},
      {temp: 38, month: 'February'},
      {temp: 47, month: 'March'},
      {temp: 59, month: 'April'},
      {temp: 70, month: 'May'},
      {temp: 80, month: 'June'},
      {temp: 84, month: 'July'},
      {temp: 83, month: 'August'},
      {temp: 76, month: 'September'},
      {temp: 64, month: 'October'},
      {temp: 49, month: 'November'},
      {temp: 37, month: 'December'}
    ];

    this.months = this.temperatures.map(function(t) {
      return t.month;
    });

    this.margin = {top: 5, right: 5, bottom: 50, left: 50};

    this.fullWidth = 700;

    this.fullHeight = 200;

    this.width = this.fullWidth - this.margin.right - this.margin.left;
    this.height = this.fullHeight - this.margin.top - this.margin.bottom;


    this.svg = d3.select('div').append('svg')
      .attr('width', this.fullWidth)
      .attr('height', this.fullHeight)
      // this g is where the bar chart will be drawn
      .append('g')
      // translate it to leave room for the left and top margins
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // x value determined by month
    this.monthScale = d3.scaleBand()
      .domain(this.months)
      .range([0, this.width])
      .paddingInner(0.1);

    // the width of the bars is determined by the scale
    this.bandwidth = this.monthScale.bandwidth();

    // y value determined by temp
    this.maxTemp = d3.max(this.temperatures, function(d) { return d.temp; });
    this.tempScale = d3.scaleLinear()
      .domain([0, this.maxTemp])
      .range([this.height, 0])
      .nice();

    this.xAxis = d3.axisBottom(this.monthScale);
    this.yAxis = d3.axisLeft(this.tempScale);

    // draw the axes
    this.svg.append('g')
      .classed('x axis', true)
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.yAxisEle = this.svg.append('g')
      .classed('y axis', true)
      .call(this.yAxis);


    // add a label to the yAxis
    this.yText = this.yAxisEle.append('text')
      .attr('transform', 'rotate(-90)translate(-' + this.height / 2 + ',0)')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('dy', '-2.5em')
      .style('font-size', 14)
      .text('Fahrenheit');

    this.barHolder = this.svg.append('g')
      .classed('bar-holder', true);


    // draw the bars
    this.bars = this.barHolder.selectAll('rect.bar')
      .data(this.temperatures)
      .enter().append('rect')
      .classed('bar', true)
      .attr('x',(d, i) => {
        // the x value is determined using the
        // month of the datum
        return this.monthScale(d.month);
      })
      .attr('width', this.bandwidth)
      .attr('y', (d) => {
        // the y position is determined by the datum's temp
        // this value is the top edge of the rectangle
        return this.tempScale(d.temp);
      })
      .attr('height', (d) => {
        // the bar's height should align it with the base of the chart (y=0)
        return this.height - this.tempScale(d.temp);
      });

  }



  toCelsius(f): number {
    return (f - 32) * 5 / 9;
  }

  toFahrenheit(c): number {
    return c * 9 / 5 + 32;
  }

  convert() {
    // convert temperatures between celsius and fahrenheit
    this.converter = this.isCelsius ? this.toFahrenheit : this.toCelsius;
    this.yText.text(this.isCelsius ? 'Fahrenheit' : 'Celsius');
    this.isCelsius = !this.isCelsius;
    this.temperatures.forEach((t) =>{
      t.temp = this.converter(t.temp);
    });

    // redraw the bars
    this.reDraw();
  }

  shuffle() {

    let m, t, i: number;
    m = this.temperatures.length;
    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.temperatures[m].temp;
      this.temperatures[m].temp = this.temperatures[i].temp;
      this.temperatures[i].temp = t;
    }


    // redraw the bars
    this.reDraw();

  }


  reDraw(){

    // redraw the bars
    this.bars
      .transition()
      .duration(2500)
      .attr('y', (d) => {
        return this.tempScale(d.temp);
      })
      .attr('height', (d) => {
        return this.height - this.tempScale(d.temp);
      });

  }

  ngOnInit() {}



}
