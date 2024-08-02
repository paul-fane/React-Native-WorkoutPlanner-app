import { createSlice } from "@reduxjs/toolkit";

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: { myWorkoutsList: [] },
  reducers: {
    loadWorkoutsList(state, action) {
      state.myWorkoutsList = action.payload.workouts;
    },
    addWorkout(state, action) {
      state.myWorkoutsList.push(action.payload.workout);
    },
    deleteWorkout(state, action) {
      state.myWorkoutsList = state.myWorkoutsList.filter(
        (workout) => workout.slug !== action.payload.workoutSlug
      );
    },
    editWorkout(state, action){
        let updateList = state.myWorkoutsList.map((workout) =>{
            if (workout.id === action.payload.workout.id){
                return action.payload.workout
            } else {
                return workout 
            }
        })
        state.myWorkoutsList = updateList
    },
  },
});

export const workoutsActions = workoutsSlice.actions;

export default workoutsSlice;
