import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js library

function PieChart() {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = () => {
    axios.get('http://localhost:4000/budget')
      .then(res => {
        setBudgetData(res.data.myBudget);
        createChart(res.data.myBudget);
      })
      .catch(error => {
        console.error('Error fetching budget:', error);
      });
  };

  const createChart = (data) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
        }]
      }
    });
  };

  return (
    <canvas id="myChart" width="400" height="400"></canvas>
  );
}

export default PieChart;
