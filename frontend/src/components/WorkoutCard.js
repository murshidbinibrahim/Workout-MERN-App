import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    console.log("inside handleClick");
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

      console.log("Workout Deleted", json);

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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutCard;
