import React from "react";

const WorkoutCard = ({ workout }) => {
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
    </div>
  );
};

export default WorkoutCard;
