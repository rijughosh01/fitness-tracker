import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Weekly Calories Burned',
        data: data.map(entry => entry.calories),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Line data={chartData} />;
};

WeeklyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default WeeklyChart;
