import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async (routine) => {
    try {
      const { authTokens, newRoutine } = routine;
      const response = await fetch(
        "http://192.168.1.118:8081/workouts/routine/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify(newRoutine),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);



const routinesSlice = createSlice({
  name: "routines",
  initialState: { routinesList: [], loading: false, error: null },
  reducers: {
    loadRoutinesList(state, action) {
      for (routine in action.payload.routines) {
        state.routinesList.push(routine);
      }
      //state.routinesList = action.payload.routines;
    },
    addRoutine(state, action) {
      state.routinesList.push(action.payload.routine);
    },
    deleteRoutine(state, action) {
      state.routinesList = state.routinesList.filter(
        (routine) => routine.key !== action.payload.routineId
      );
    },
    editRoutine(state, action) {
      let updateList = state.routinesList.map((routine) => {
        if (routine.key === action.payload.routine.key) {
          return action.payload.routine;
        } else {
          return routine;
        }
      });
      state.routinesList = updateList;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for the pending, fulfilled, and rejected states of the async action
    builder
      .addCase(addRoutine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routinesList.push({
          key: action.payload.id,
          title: action.payload.name,
          workout: action.payload.workout,
          order: action.payload.order,
        });
      })
      .addCase(addRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errorMessage;
      });
  },
});

export const routinesActions = routinesSlice.actions;

export default routinesSlice;
