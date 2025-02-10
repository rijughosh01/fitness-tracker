import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const WorkoutPlan = ({ addWorkoutPlan }) => {
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddExercise = () => {
    setExercises([...exercises, newExercise]);
    setNewExercise('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (planName && exercises.length > 0) {
      addWorkoutPlan({ planName, exercises });
      setPlanName('');
      setExercises([]);
      setIsFormVisible(false);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="workout-plan card my-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title">Create Workout Plan</h2>
          <button onClick={toggleFormVisibility} className="btn btn-icon">
            <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} size="lg" />
          </button>
        </div>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="planName" className="form-label">Plan Name</label>
              <input
                type="text"
                className="form-control"
                id="planName"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newExercise" className="form-label">New Exercise</label>
              <input
                type="text"
                className="form-control"
                id="newExercise"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
              />
              <button type="button" className="btn btn-secondary mt-2" onClick={handleAddExercise}>Add Exercise</button>
            </div>
            <ul className="list-group mb-3">
              {exercises.map((exercise, index) => (
                <li key={index} className="list-group-item">{exercise}</li>
              ))}
            </ul>
            <button type="submit" className="btn btn-primary w-100">Save Plan</button>
          </form>
        )}
      </div>
    </div>
  );
};

WorkoutPlan.propTypes = {
  addWorkoutPlan: PropTypes.func.isRequired,
};

export default WorkoutPlan;
