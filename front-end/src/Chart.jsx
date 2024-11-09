import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({labels,counts}) => {
  
  const data = {
    labels: labels, 
    datasets: [
      {
        label: 'Request count', 
        data: counts, 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1, 
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Request count', 
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'medicine name', 
        },
      },
      y: {
        title: {
          display: true,
          text: 'counts', 
        },
        beginAtZero: true, 
      },
    },
  };

  return (
    <div>
      <h2>Request Count Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
BarChart.propTypes = {
  labels: PropTypes.array.isRequired,
  counts: PropTypes.array.isRequired
};
export default BarChart;
