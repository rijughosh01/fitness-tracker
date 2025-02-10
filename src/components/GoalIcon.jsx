import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import GoalForm from './GoalForm';
import GoalList from './GoalList';
import PropTypes from 'prop-types';

const GoalIcon = ({ goals, progress, onAddGoal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="text-center p-2">
      <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={dropdownOpen} style={{ cursor: 'pointer', color: '#007bff' }}>
        <FontAwesomeIcon icon={faBullseye} size="2x" />
        <p>Set Goals</p>
      </DropdownToggle>
      <DropdownMenu className="w-100 mt-3 p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="card p-3 mb-3">
          <h4 className="text-center mb-3">Set Goals</h4>
          <GoalForm onAddGoal={onAddGoal} />
          <GoalList goals={goals} progress={progress} />
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

GoalIcon.propTypes = {
  goals: PropTypes.array.isRequired,
  progress: PropTypes.object.isRequired,
  onAddGoal: PropTypes.func.isRequired,
};

export default GoalIcon;
