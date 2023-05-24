import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const initialState = {
  workouts: null,
};

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };

    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  //dispath({type: "SET_WORKOUT", payload : workoutData})

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
