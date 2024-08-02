import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", authTokens: "", notification: null },
  reducers: {
    authenticate(state, action) {
      state.authTokens = action.payload.authTokens;
    },
    logout(state) {
      (state.user = ""), (state.authTokens = ""), (state.notification = null);
    },
    updateToken(state, action) {
      state.authTokens = action.payload.authTokens;
    },
    theUserIsNotLoggedIn(state){
      state.notification = true;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
