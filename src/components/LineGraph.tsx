import React from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './chartConfig'; // Import the Chart.js configuration file

const fetchHistoricalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

const LineGraph = React.memo(() => {
  const { data } = useQuery('historicalData', fetchHistoricalData);

  const chartData = {
    labels: Object.keys(data?.cases || {}),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(data?.cases || {}),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return <Line data={chartData} />;
});

export default LineGraph;
