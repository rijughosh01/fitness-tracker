import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});

  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
    const updatedProgress = { ...progress };
    goals.forEach((goal) => {
      if (!updatedProgress[goal.goal]) {
        updatedProgress[goal.goal] = 0;
      }
      updatedProgress[goal.goal] +=
        (workout.calories / goal.targetCalories) * 100;
    });
    setProgress(updatedProgress);
  };

  const editWorkout = (index, updatedWorkout) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index] = updatedWorkout;
    setWorkouts(updatedWorkouts);
  };

  const deleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  return (
    <AuthProvider>
      <div className="container mt-5">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                workouts={workouts}
                addWorkout={addWorkout}
                editWorkout={editWorkout}
                deleteWorkout={deleteWorkout}
                goals={goals}
                addGoal={addGoal}
                progress={progress}
              />
            }
          />
          <Route
            path="/progress"
            element={
              <Progress workouts={workouts} goals={goals} progress={progress} />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
