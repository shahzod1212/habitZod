import { createSlice } from "@reduxjs/toolkit";
import { del, set } from "idb-keyval";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: "",
    refreshToken: "",
    id: 0,
  },
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;

      set(
        "user",
        JSON.parse(
          JSON.stringify({
            id: state.id,
            username: state.username,
            email: state.email,
            token: state.token,
            refreshToken: state.refreshToken,
          }),
        ),
      );
    },

    removeUser: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.token = "";
      state.refreshToken = "";

      del("user");
    },

    initialUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { addUser, removeUser, initialUser } = userSlice.actions;
export default userSlice.reducer;
