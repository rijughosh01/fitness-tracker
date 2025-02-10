import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faRunning, faWalking, faSwimmer, faBicycle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const workoutIcons = [
  { name: 'Push-Up', icon: faDumbbell },
  { name: 'Legs', icon: faRunning },
  { name: 'Calf', icon: faWalking },
  { name: 'Pull-Down', icon: faSwimmer },
  { name: 'Plank', icon: faClipboardList },
  { name: 'Pull-Up', icon: faBicycle },
];

const WorkoutIconList = ({ workouts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Workouts</h2>
      <div className="d-flex justify-content-around flex-wrap">
        {workoutIcons.map((workoutIcon, index) => (
          <Dropdown key={index} isOpen={dropdownOpen === index} toggle={() => toggle(index)} className="text-center p-2">
            <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={dropdownOpen === index} style={{ cursor: 'pointer', color: '#007bff' }}>
              <FontAwesomeIcon icon={workoutIcon.icon} size="3x" />
              <p>{workoutIcon.name}</p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{workoutIcon.name}</DropdownItem>
              {workouts.filter(workout => workout.workout === workoutIcon.name).map((workout, i) => (
                <DropdownItem key={i}>
                  <p>Date: {workout.date}</p>
                  <p>Calories: {workout.calories}</p>
                  <p>City: {workout.city}</p>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ))}
      </div>
    </div>
  );
};

WorkoutIconList.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      workout: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      city: PropTypes.string,
    })
  ).isRequired,
};

export default WorkoutIconList;
