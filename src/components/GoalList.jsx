import PropTypes from 'prop-types';

const GoalList = ({ goals, progress }) => {
  return (
    <div className="container my-4">
      <h4 className="text-center mb-3">Goals List</h4>
      <ul className="list-group">
        {goals.map((goal, index) => (
          <li key={index} className="list-group-item goal-list-item">
            <h5>Category: {goal.category}</h5>
            <p><strong>Goal Description:</strong> {goal.goal}</p>
            <p><strong>Target Date:</strong> {goal.targetDate}</p>
            <p><strong>Progress:</strong> {progress[goal.goal] || 0}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

GoalList.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      goal: PropTypes.string.isRequired,
      targetDate: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  progress: PropTypes.object.isRequired,
};

export default GoalList;
