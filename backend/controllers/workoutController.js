const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// CREATE new Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ updatedAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout or invalid id" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workouts = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!workouts) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workouts = await Workout.findOneAndDelete({ _id: id });

    if (!workouts) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
