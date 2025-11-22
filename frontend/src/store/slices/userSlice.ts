import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
  isConnected: boolean;
  lastLogin?: string; // ISO date string, optional
}

const initialState: UserState = {
  fullName: "",
  email: "",
  walletAddress: null,
  isAdmin: false,
  isTeacher: false,
  isConnected: false,
  lastLogin: undefined,
};

// Payload dùng khi connectUser
interface UserPayload {
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
  lastLogin?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action: PayloadAction<UserPayload>) => {
      const { fullName, email, walletAddress, isAdmin, isTeacher, lastLogin } = action.payload;

      state.fullName = fullName;
      state.email = email;
      state.walletAddress = walletAddress;
      state.isAdmin = Boolean(isAdmin);
      state.isTeacher = Boolean(isTeacher);
      state.isConnected = true;
      state.lastLogin = lastLogin;
    },

    disconnectUser: (state) => {
      state.fullName = "";
      state.email = "";
      state.walletAddress = null;
      state.isAdmin = false;
      state.isTeacher = false;
      state.isConnected = false;
      state.lastLogin = undefined;
    },

    // Optional: cập nhật wallet khi giảng viên connect MetaMask sau login
    updateWallet: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { connectUser, disconnectUser, updateWallet } = userSlice.actions;
export default userSlice.reducer;
