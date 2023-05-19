const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

//importing all routes
const workoutRoute = require("./routes/workout-route");

//configuring routes
app.use("/api/workouts", workoutRoute);

//Establish DB Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    //listening for requests
    app.listen(process.env.PORT, () => {
      console.log("Backend Server is running!!!");
    });
  })
  .catch((error) => {
    console.log(`MongoDB Connection Failed : ${error.message}`);
  });
