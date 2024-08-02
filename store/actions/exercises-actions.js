import { exercisesActions } from "../reducers/exercises-slice";

export const addExercise = (authTokens, exercise) => {
  //value = new Date(`${value}`).toISOString().slice(12, 16);

  let setsFormatTime = exercise.sets.map((set) => {
    // return {
    //     ...set,
    //     time: set.time === "" ? null: new Date(`${set.time}`).toISOString().slice(11, 16),
    //     rest_time: set.rest_time === "" ? null: new Date(`${set.rest_time}`).toISOString().slice(11, 16),
    //   };
    return {
      ...set,
      time: set.time === "" ? null : "00:" + set.time,
      rest_time: set.rest_time === "" ? null : "00:" + set.rest_time,
    };
  });

  let exercisesFormatTime = {
    exercise_id: exercise.exercise_id,
    type: exercise.type,
    warm_up: exercise.warm_up,
    name: exercise.name,
    muscle: exercise.muscle,
    routine: exercise.routine,
    description: exercise.description,
    rest_time: exercise.rest_time === "" ? null : "00:" + exercise.rest_time,
    sets: setsFormatTime,
  };
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.1.118:8081/workouts/exercise/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(exercisesFormatTime),
      }
    );
    // The update list of exercises
    const data = await response.json();
    // console.log(data);
    // console.log(response.status);
    if (response.status === 201) {
      dispatch(exercisesActions.addExercise({ exercise: data }));
    } else {
      console.log(data);
    }
  };
};

export const deleteExercise = (authTokens, currentExerciseId) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/exercise/delete/${currentExerciseId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );

    if (response.status === 204) {
      dispatch(exercisesActions.deleteExercise({ exerciseId: currentExerciseId }));
    } else {
      console.log(response.status);
    }
  };
};

export const editExercise = (authTokens, id, exercise, sets) => {
  let setsFormatTime = sets.map((set) => {
    return {
      ...set,
      time: set.time === "" ? null : "00:" + set.time,
      rest_time: set.rest_time === "" ? null : "00:" + set.rest_time,
    };
  });

  let exercisesFormatTime = {
    order: exercise.order,
    exercise_id: exercise.exercise_id,
    type: exercise.type,
    warm_up: exercise.warm_up,
    name: exercise.name,
    muscle: exercise.muscle,
    routine: exercise.routine,
    description: exercise.description,
    rest_time: exercise.rest_time === "" ? null : "00:" + exercise.rest_time,
    sets: setsFormatTime,
  };
  
  
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/exercise/update/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        // body: JSON.stringify(exercise),
        body: JSON.stringify(exercisesFormatTime),
      }
    );
    const data = await response.json();
    console.log(response.status);
    console.log(data);

    if (response.ok) {
      dispatch(exercisesActions.editExercise({ exercise: data }));
    } else {
      console.log(response.status);
    }
  };
};


export const reorderExercises = (authTokens, exercises, routineId) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/exercise/sortRoutines/${routineId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(exercises),
      }
    );
    const data = await response.json();
    if (response.ok) {
      for (item of data) {
        dispatch(exercisesActions.deleteExercise({exerciseId: item.id}))
        dispatch(exercisesActions.addExercise({ exercise: item }))
      }
      
    } else {
      console.log(data);
    }
  };
};