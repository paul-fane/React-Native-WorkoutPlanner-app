import { createSelector } from "@reduxjs/toolkit";

// Selectors for tokens
export const selectAuthTokens = (state) => state.auth.authTokens;

// Selectors for workouts
export const selectWorkouts = (state) => state.workouts.myWorkoutsList;

// Selectors for routines
export const selectRoutines = (state) => state.routines.routinesList;

// Selectors for exercises
export const selectExercises = (state) => state.exercises.exercisesList;

// Selector to get workout by ID
export const selectWorkoutBySlug = createSelector(
  [selectWorkouts, (_, uworkoutSlug) => uworkoutSlug],
  (workouts, uworkoutSlug) =>
    Object.values(workouts).find((workout) => workout.slug === uworkoutSlug)
);

// Selector to get routines by workout ID
export const selectRoutinesByWorkoutId = createSelector(
  [selectRoutines, (_, workoutId) => workoutId],
  (routines, workoutId) =>
    Object.values(routines).filter((routine) => routine.workout === workoutId)
);

// Selector to get exercises by routines ID
export const selectExercisesByRoutineId = createSelector(
    [selectExercises, (_, routineId) => routineId],
    (exercises, routineId) =>
      Object.values(exercises).filter((exercise) => exercise.routine === routineId)
  );