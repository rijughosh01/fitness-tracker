import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";
import GoalIcon from "../components/GoalIcon";
import ProgressIcon from "../components/ProgressIcon";
import WorkoutIconList from "../components/WorkoutIconList";
import WorkoutPlan from "../components/WorkoutPlan";
import PropTypes from "prop-types";

const Home = ({
  workouts,
  addWorkout,
  editWorkout,
  deleteWorkout,
  goals,
  addGoal,
  progress,
}) => {
  const [workoutList, setWorkoutList] = useState(workouts);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [editingPlanIndex, setEditingPlanIndex] = useState(null); // State for editing
  const [planName, setPlanName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");
  const { currentUser } = useAuth();

  const handleAddWorkout = (newWorkout) => {
    setWorkoutList([...workoutList, newWorkout]);
    addWorkout(newWorkout);
  };

  const handleEditWorkout = (index, updatedWorkout) => {
    const updatedWorkoutList = [...workoutList];
    updatedWorkoutList[index] = updatedWorkout;
    setWorkoutList(updatedWorkoutList);
    editWorkout(index, updatedWorkout);
  };

  const handleDeleteWorkout = (index) => {
    const updatedWorkoutList = workoutList.filter((_, i) => i !== index);
    setWorkoutList(updatedWorkoutList);
    deleteWorkout(index);
  };

  const handleAddGoal = (newGoal) => {
    addGoal(newGoal);
  };

  const handleAddWorkoutPlan = (newPlan) => {
    setWorkoutPlans([...workoutPlans, newPlan]);
  };

  const handleDeleteWorkoutPlan = (index) => {
    const updatedWorkoutPlans = workoutPlans.filter((_, i) => i !== index);
    setWorkoutPlans(updatedWorkoutPlans);
  };

  const handleEditWorkoutPlan = (index) => {
    const planToEdit = workoutPlans[index];
    setEditingPlanIndex(index);
    setPlanName(planToEdit.planName);
    setExercises(planToEdit.exercises);
  };

  const handleUpdateWorkoutPlan = () => {
    const updatedPlans = [...workoutPlans];
    updatedPlans[editingPlanIndex] = { planName, exercises };
    setWorkoutPlans(updatedPlans);
    setEditingPlanIndex(null);
    setPlanName("");
    setExercises([]);
    setNewExercise("");
  };

  const handleAddExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
    setNewExercise("");
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center my-4">
          <h1 className="website-heading">Fitness Tracker App</h1>
          {currentUser && <p>Welcome, {currentUser.email}</p>}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <GoalIcon
            goals={goals}
            progress={progress}
            onAddGoal={handleAddGoal}
          />
        </div>
        <div className="col-6">
          <ProgressIcon workouts={workoutList} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <WorkoutForm onAddWorkout={handleAddWorkout} />
        </div>
        <div className="col-md-6">
          <WorkoutIconList workouts={workouts} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <WorkoutList
            workouts={workoutList}
            onEditWorkout={handleEditWorkout}
            onDeleteWorkout={handleDeleteWorkout}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <WorkoutPlan addWorkoutPlan={handleAddWorkoutPlan} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-body">
              <h2 className="card-title text-center">Your Workout Plans</h2>
              <ul className="list-group">
                {workoutPlans.map((plan, index) => (
                  <li key={index} className="list-group-item">
                    <h4>{plan.planName}</h4>
                    <ul>
                      {plan.exercises.map((exercise, exerciseIndex) => (
                        <li key={exerciseIndex}>{exercise}</li>
                      ))}
                    </ul>
                    <div className="button-group">
                      <button
                        className="btn btn-primary btn-edit"
                        onClick={() => handleEditWorkoutPlan(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-delete"
                        onClick={() => handleDeleteWorkoutPlan(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {editingPlanIndex !== null && (
                <div className="edit-form">
                  <h3>Edit Workout Plan</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateWorkoutPlan();
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="editPlanName" className="form-label">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editPlanName"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newExercise" className="form-label">
                        New Exercise
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="newExercise"
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={() => handleAddExercise(newExercise)}
                      >
                        Add Exercise
                      </button>
                    </div>
                    <ul className="list-group mb-3">
                      {exercises.map((exercise, index) => (
                        <li key={index} className="list-group-item">
                          {exercise}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm float-end"
                            onClick={() => handleRemoveExercise(index)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button type="submit" className="btn btn-primary w-100">
                      Update Plan
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  workouts: PropTypes.array.isRequired,
  addWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired,
  addGoal: PropTypes.func.isRequired,
  progress: PropTypes.object.isRequired,
};

export default Home;
