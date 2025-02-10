import { useState } from 'react';
import PropTypes from 'prop-types';

const GoalForm = ({ onAddGoal }) => {
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('Fitness');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal({ goal, targetDate, category });
    setGoal('');
    setTargetDate('');
    setCategory('Fitness');
  };

  return (
    <form onSubmit={handleSubmit} className="container my-4">
      <div className="mb-3">
        <label htmlFor="goal" className="form-label">Goal Description</label>
        <input 
          type="text" 
          className="form-control" 
          id="goal" 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)} 
          placeholder="Describe your goal"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select 
          className="form-control" 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Fitness">Fitness</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Endurance">Endurance</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="targetDate" className="form-label">Target Date</label>
        <input 
          type="date" 
          className="form-control" 
          id="targetDate" 
          value={targetDate} 
          onChange={(e) => setTargetDate(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary">Set Goal</button>
    </form>
  );
};

GoalForm.propTypes = {
  onAddGoal: PropTypes.func.isRequired,
};

export default GoalForm;
