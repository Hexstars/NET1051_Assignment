import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginInfo } from "../../Client/services/authService";

interface AuthState {
  isLoggedIn: boolean;
  token?: string;
  userInfo?: LoginInfo;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: undefined,
    userInfo: undefined,
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; userInfo: LoginInfo }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.userInfo = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
