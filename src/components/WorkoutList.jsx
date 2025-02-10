import { useState } from "react";
import PropTypes from "prop-types";

const WorkoutList = ({ workouts, onEditWorkout, onDeleteWorkout }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editWorkout, setEditWorkout] = useState({
    workout: "",
    calories: 0,
    date: "",
    city: "",
    notes: "",
  });

  const handleEditClick = (index, workout) => {
    setEditIndex(index);
    setEditWorkout({ ...workout });
  };

  const handleSaveClick = (index) => {
    onEditWorkout(index, editWorkout);
    setEditIndex(-1);
    setEditWorkout({
      workout: "",
      calories: 0,
      date: "",
      city: "",
      notes: "",
    });
  };

  const handleDeleteClick = (index) => {
    onDeleteWorkout(index);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {workouts.map((workout, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                {editIndex === index ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editWorkout.workout}
                      onChange={(e) =>
                        setEditWorkout({
                          ...editWorkout,
                          workout: e.target.value,
                        })
                      }
                      placeholder="Workout description"
                      className="form-control my-2"
                    />
                    <input
                      type="number"
                      value={editWorkout.calories}
                      onChange={(e) =>
                        setEditWorkout({
                          ...editWorkout,
                          calories: e.target.value,
                        })
                      }
                      placeholder="Calories burned"
                      className="form-control my-2"
                    />
                    <input
                      type="date"
                      value={editWorkout.date}
                      onChange={(e) =>
                        setEditWorkout({ ...editWorkout, date: e.target.value })
                      }
                      className="form-control my-2"
                    />
                    <input
                      type="text"
                      value={editWorkout.city}
                      onChange={(e) =>
                        setEditWorkout({ ...editWorkout, city: e.target.value })
                      }
                      placeholder="City for weather data"
                      className="form-control my-2"
                    />
                    <textarea
                      value={editWorkout.notes}
                      onChange={(e) =>
                        setEditWorkout({
                          ...editWorkout,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Additional notes"
                      className="form-control my-2"
                    />
                    <button
                      onClick={() => handleSaveClick(index)}
                      className="btn btn-primary ml-2 my-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(-1)}
                      className="btn btn-secondary ml-2 my-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>
                      {workout.date}: {workout.workout} - {workout.calories}{" "}
                      calories
                    </p>
                    {workout.notes && <p>Notes: {workout.notes}</p>}
                    {workout.weatherInfo && (
                      <div className="weather-info">
                        <h5>Weather Information:</h5>
                        <p>
                          <strong>City:</strong> {workout.weatherInfo.name}
                        </p>
                        <p>
                          <strong>Temperature:</strong>{" "}
                          {workout.weatherInfo.main.temp} °C
                        </p>
                        <p>
                          <strong>Feels Like:</strong>{" "}
                          {workout.weatherInfo.main.feels_like} °C
                        </p>
                        <p>
                          <strong>Humidity:</strong>{" "}
                          {workout.weatherInfo.main.humidity}%
                        </p>
                        <p>
                          <strong>Weather:</strong>{" "}
                          {workout.weatherInfo.weather[0].description}
                        </p>
                        <p>
                          <strong>Wind Speed:</strong>{" "}
                          {workout.weatherInfo.wind.speed} m/s
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => handleEditClick(index, workout)}
                      className="btn btn-primary ml-2 my-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="btn btn-danger ml-2 my-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

WorkoutList.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      workout: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      city: PropTypes.string,
      notes: PropTypes.string,
      weatherInfo: PropTypes.object,
    })
  ).isRequired,
  onEditWorkout: PropTypes.func.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
};

export default WorkoutList;
