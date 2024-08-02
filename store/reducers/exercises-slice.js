import { createSlice } from "@reduxjs/toolkit";

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: { exercisesList: [] },
  reducers: {
    // loadExercisesList(state, action) {
    //   for (exercise in action.payload.exercises) {
    //     state.exercisesList.push(exercise);
    //   }
    // },
    addExercise(state, action) {
      state.exercisesList.push(action.payload.exercise);
    },
    deleteExercise(state, action) {
      state.exercisesList = state.exercisesList.filter(
        (exercise) => exercise.id !== action.payload.exerciseId
      );
    },
    editExercise(state, action) {
      let updateList = state.exercisesList.map((exercise) => {
        if (exercise.id === action.payload.exercise.id) {
          return action.payload.exercise;
        } else {
          return exercise;
        }
      });
      state.exercisesList = updateList;
    },
  },
});

export const exercisesActions = exercisesSlice.actions;

export default exercisesSlice;