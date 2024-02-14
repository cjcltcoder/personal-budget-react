import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function D3Chart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = () => {
    axios.get('http://localhost:4000/chart')
      .then(response => {
        const parsedData = response.data.myBudget.map(item => ({
          label: item.title,
          value: item.budget
        }));
        setChartData(parsedData);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  };

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [chartData]);

  const renderChart = () => {
    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2;
  
    const color = d3.scaleOrdinal()
      .domain(chartData.map(d => d.label))
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);
  
    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);
  
    const outerArc = d3.arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);
  
    const svg = d3.select('#d3PieChart').selectAll('svg').data([chartData]);
    const svgEnter = svg.enter().append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
    const arcs = svgEnter.selectAll('.arc')
      .data(pie(chartData))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));
  
    arcs.append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        return `translate(${pos})`;
      })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.label);
  
      arcs.append('polyline')
      .attr('points', d => {
        const posArc = arc.centroid(d);
        const posOuterArc = outerArc.centroid(d);
        // Adjust the length of the line
        const shortenedPos = [
          posArc[0] * 0.68 + posOuterArc[0] * 0.5,
          posArc[1] * 0.68 + posOuterArc[1] * 0.5
        ];
        return [posArc, shortenedPos];
      })
      .style('fill', 'none')
      .style('stroke', '#666')
      .style('stroke-width', '1px');
  };

  return (
    <div id="d3PieChart"></div>
  );
}

export default D3Chart;
