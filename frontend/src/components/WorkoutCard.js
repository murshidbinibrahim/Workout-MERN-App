import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/workouts/" + workout._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "DELETE_WORKOUT",
          payload: json,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="workout-card">
      <h4>{workout?.title}</h4>
      <p>
        <strong>Load in (Kg): </strong> {workout?.load}
      </p>
      <p>
        <strong>Reps: </strong> {workout?.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutCard;
