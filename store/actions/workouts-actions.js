import { workoutsActions } from "../reducers/workouts-slice";

export const loadWorkouts = (authTokens) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://192.168.1.118:8081/workouts/myworkouts/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      console.log("Fetch workouts list");
      if (response.ok) {
        const data = await response.json();
        dispatch(workoutsActions.loadWorkoutsList({ workouts: data }));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addWorkoutPlan = (authTokens, newWorkoutPlan) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.1.118:8081/workouts/myworkouts/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        // body: JSON.stringify(newWorkoutPlan),
        body: JSON.stringify({
          name: newWorkoutPlan.name,
          description: newWorkoutPlan.description,
          goal: newWorkoutPlan.goal,
          level: newWorkoutPlan.level,
          start_date:
            newWorkoutPlan.start_date != ""
              ? new Date(`${newWorkoutPlan.start_date}`)
              .toISOString()
              .slice(0, 10)
              : null,
          end_date:
            newWorkoutPlan.end_date != ""
              ? new Date(`${newWorkoutPlan.end_date}`)
              .toISOString()
              .slice(0, 10)
              : null,
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch(workoutsActions.addWorkout({ workout: data }));
      console.log("workout added");
      console.log(data);
    } else {
      console.log("something went wrong");
      console.log(data);
      throw new Error(data);
    }
  };
};

export const editWorkoutPlan = (authTokens, editWorkoutPlan, slug) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/myworkouts/${slug}/update/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          name: editWorkoutPlan.name,
          description: editWorkoutPlan.description,
          goal: editWorkoutPlan.goal,
          level: editWorkoutPlan.level,
          start_date:
            editWorkoutPlan.start_date != ""
              ? new Date(`${editWorkoutPlan.start_date}`)
                  .toISOString()
                  .slice(0, 10)
              : null,
          end_date:
            editWorkoutPlan.end_date != ""
              ? new Date(`${editWorkoutPlan.end_date}`)
                  .toISOString()
                  .slice(0, 10)
              : null,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      dispatch(workoutsActions.editWorkout({ workout: data }));
    } else {
      throw new Error(data);
    }
  };
};

export const deleteWorkoutPlan = (authTokens, workoutSlug) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.118:8081/workouts/myworkouts/${workoutSlug}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    if (response.ok) {
      dispatch(workoutsActions.deleteWorkout({ workoutSlug: workoutSlug }));
    } else {
      throw new Error("something went wrong");
    }
  };
};
