import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    try {
      const res = await fetch("http://localhost:8000/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      if (!res.ok) setError(json.error);

      if (res.status === 200) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("New Workout added");
        console.log(json);
        dispatch({
          type: "CREATE_WORKOUT",
          payload: json,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="workout-form">
        <form onSubmit={handleSubmit}>
          <h1>Add New Workout</h1>
          <label>
            Exercise Title :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Load (in Kg) :
            <input
              type="number"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </label>
          <label>
            Reps :
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </label>
          <button>Add Workout</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default WorkoutForm;
