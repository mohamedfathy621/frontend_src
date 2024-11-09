import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({labels,counts}) => {

  const data = {
    labels: labels, 
    datasets: [
      {
        label: 'Request count chart', 
        data: counts, 
        backgroundColor: ['#FF5733', '#33C1FF', '#FFEB33'], 
        hoverBackgroundColor: ['#FF2D00', '#0099FF', '#FFD700'], 
      },
    ],
  };

  
  const options = {
    responsive: true, 
    plugins: {
      tooltip: {
        enabled: true, 
      },
      legend: {
        position: 'top', 
        labels: {
          boxWidth: 20, 
        },
      },
    },
    maintainAspectRatio: false, 
    cutout: '50%', 
  };

  return (
    <div  style={{width:"100%", height:"400px",margin:"auto"}}>
    <div className='row'>
    <h2>Request count chart</h2>
    </div>
    <div className='row d-flex justify-content-center' style={{width:"100%",height:"400px"}}>
    <Doughnut data={data} options={options} />
    </div>
    </div>
  );
};
DoughnutChart.propTypes = {
    labels: PropTypes.array.isRequired,
    counts: PropTypes.array.isRequired
}
export default DoughnutChart;
