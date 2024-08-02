import { configureStore } from "@reduxjs/toolkit";

import workoutsSlice from "./reducers/workouts-slice";
import authSlice from "./reducers/auth-slice";
import routinesSlice from "./reducers/routines-slice";
import exercisesSlice from "./reducers/exercises-slice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice.reducer,
    auth: authSlice.reducer,
    routines: routinesSlice.reducer,
    exercises: exercisesSlice.reducer,
  },
});

export default store;
