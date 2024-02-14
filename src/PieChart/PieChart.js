import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function PieChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const getBudget = () => {
      axios.get('http://localhost:4000/budget')
        .then(res => {
          createChart(res.data.myBudget);
        })
        .catch(error => {
          console.error('Error fetching budget:', error);
        });
    };

    getBudget(); // Call getBudget inside useEffect
  }, []); // Empty dependency array since getBudget doesn't depend on any props or state

  const createChart = (data) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
        }]
      }
    });

    chartRef.current = newChart;
  };

  return (
    <canvas id="myChart" width="400" height="400"></canvas>
  );
}

export default PieChart;
