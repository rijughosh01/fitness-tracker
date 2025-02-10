import PropTypes from 'prop-types';
import ProgressBarChart from '../charts/ProgressBarChart';
import WeeklyChart from '../charts/WeeklyChart';
import MonthlyChart from '../charts/MonthlyChart';

const Progress = ({ workouts }) => {
  const progressData = workouts.map(workout => ({
    date: workout.date,
    workout: workout.workout,
    calories: workout.calories,
  }));

  const weeklyData = workouts.map(workout => ({
    date: workout.date,
    calories: workout.calories,
  }));

  const monthlyData = workouts.map(workout => ({
    date: workout.date,
    calories: workout.calories,
  }));

  const totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center my-4">
          <h1>Progress</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center my-4">
          <h2>Total Calories Burned</h2>
          <p>{Number(totalCalories)}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-4">Workout Progress</h2>
          <ProgressBarChart data={progressData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-4">Weekly Summary</h2>
          <WeeklyChart data={weeklyData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-4">Monthly Summary</h2>
          <MonthlyChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      workout: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      city: PropTypes.string,
      weatherInfo: PropTypes.object,
    })
  ).isRequired,
};

export default Progress;
