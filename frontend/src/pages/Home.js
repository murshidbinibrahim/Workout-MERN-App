import React from "react";
import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUT",
          payload: json,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="work-card">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutCard key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
