import { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeatherData } from '../api/openweather';

const WorkoutForm = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState('');
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const weatherData = await getWeatherData(city);
      onAddWorkout({ workout, calories, date, city, weatherInfo: weatherData });
      setWorkout('');
      setCalories(0);
      setDate('');
      setCity('');
    } catch (error) {
      setError('Failed to fetch weather data. Please check your API credentials and try again.');
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container my-4">
      <div className="mb-3">
        <label htmlFor="workout" className="form-label">Workout Description</label>
        <input 
          type="text" 
          className="form-control" 
          id="workout" 
          value={workout} 
          onChange={(e) => setWorkout(e.target.value)} 
          placeholder="Workout description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="calories" className="form-label">Calories Burned</label>
        <input 
          type="number" 
          className="form-control" 
          id="calories" 
          value={calories} 
          onChange={(e) => setCalories(e.target.value)} 
          placeholder="Calories burned"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input 
          type="date" 
          className="form-control" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input 
          type="text" 
          className="form-control" 
          id="city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="City for weather data"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Add Workout</button>
    </form>
  );
};

WorkoutForm.propTypes = {
  onAddWorkout: PropTypes.func.isRequired,
};

export default WorkoutForm;
