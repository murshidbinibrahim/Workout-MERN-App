import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = (
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </React.StrictMode>
);
root.render(element);
