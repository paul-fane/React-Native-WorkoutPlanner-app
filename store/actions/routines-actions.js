// import { createAsyncThunk } from '@reduxjs/toolkit';
import { routinesActions } from "../reducers/routines-slice";
import { exercisesActions } from "../reducers/exercises-slice";


export const loadRoutines = (authTokens, workoutSlug) => {
  return async (dispatch) => {
    // load routines
    // load exercises
    let response = await fetch(
      `http://192.168.1.118:8081/workouts/routine/details/${workoutSlug}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    if (response.ok && data.length > 0) {
      for (item of data) {
        dispatch(
          routinesActions.addRoutine({
            routine: {
              key: item.id,
              title: item.name,
              workout: item.workout,
              order: item.order
            },
          })
        );
        for (exercise of item.exercises) {
          dispatch(exercisesActions.addExercise({ exercise: exercise }));
        }

        // dispatch(
        //   exercisesActions.loadExercisesList({ exercises: item.exercises })
        // );
      }
    } else {
      console.log(data.detail);
    }
  };
};



export const editCurrentRoutine = (authTokens, editRoutine) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/routine/update/${editRoutine.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(editRoutine),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(
        routinesActions.editRoutine({
          routine: {
            key: data.id,
            title: data.name,
            workout: data.workout,
            order: data.order
          },
        })
      );
    } else {
      console.log(data);
    }
  };
};


export const reorderRoutines = (authTokens, routines, workoutId) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/routine/sortRoutines/${workoutId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(routines),
      }
    );
    const data = await response.json();
    if (response.ok) {
      for (item of data) {
        dispatch(routinesActions.deleteRoutine({routineId: item.id}))
        dispatch(routinesActions.addRoutine({
          routine: {
            key: item.id,
            title: item.name,
            workout: item.workout,
            order: item.order
          },
        }))
      }
      
      // await dispatch(addReorderRoutine(data))
      // dispatch(routinesActions.reorderRoutines({ routines: data }));
    } else {
      console.log(data);
    }
  };
};

export const deleteCurrentRoutine = (id, authTokens) => {
  return async (dispatch) => {
    let response = await fetch(
      `http://192.168.1.118:8081/workouts/routine/${id}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );

    if (response.ok) {
      dispatch(routinesActions.deleteRoutine({ routineId: id }));
    } else {
      console.log("Something went weong!");
    }
  };
};
