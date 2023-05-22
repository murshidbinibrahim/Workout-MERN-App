import React from "react";
import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";

function Home() {
  const [workouts, setWorkouts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutCard key={workout._id} workout={workout} />;
          })}
      </div>
    </div>
  );
}

export default Home;
