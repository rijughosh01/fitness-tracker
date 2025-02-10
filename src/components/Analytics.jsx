import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = ({ workouts }) => {
  const data = workouts.map((workout) => ({
    date: workout.date,
    calories: workout.calories,
  }));

  return (
    <div className="container my-4">
      <h4 className="text-center">Workout Analytics</h4>
      <div className="card p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

Analytics.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Analytics;
