import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Analytics from './Analytics';
import PropTypes from 'prop-types';

const ProgressIcon = ({ workouts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="text-center p-2">
      <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={dropdownOpen} style={{ cursor: 'pointer', color: '#007bff' }}>
        <FontAwesomeIcon icon={faChartLine} size="2x" />
        <p>View Progress</p>
      </DropdownToggle>
      <DropdownMenu className="w-100 mt-3 p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="card p-3 mb-3">
          <h4 className="text-center mb-3">Progress Analytics</h4>
          <Analytics workouts={workouts} />
          <Link to="/progress" className="btn btn-secondary mt-3">View Detailed Progress</Link>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

ProgressIcon.propTypes = {
  workouts: PropTypes.array.isRequired,
};

export default ProgressIcon;
