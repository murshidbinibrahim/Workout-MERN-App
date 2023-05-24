import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

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

      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyField);
      }

      if (res.status === 200) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        console.log("New Workout added", json);
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
              className={emptyFields.includes("title") ? "error" : ""}
            />
          </label>
          <label>
            Load (in Kg) :
            <input
              type="number"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className={emptyFields.includes("load") ? "error" : ""}
            />
          </label>
          <label>
            Reps :
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={emptyFields.includes("reps") ? "error" : ""}
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
