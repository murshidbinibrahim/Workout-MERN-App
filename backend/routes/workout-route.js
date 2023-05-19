const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

//Get all workouts
router.get("/", workoutController.getAllWorkouts);

//Get a workout
router.get("/:id", workoutController.getWorkout);

//Create a workout
router.post("/", workoutController.createWorkout);

//Update a workout
router.patch("/:id", workoutController.updateWorkout);

//Delete a workout
router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
