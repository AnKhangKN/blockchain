import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string,
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
  isConnected: boolean;
}

const initialState: UserState = {
  id: "",
  fullName: "",
  email: "",
  walletAddress: null,
  isAdmin: false,
  isTeacher: false,
  isConnected: false,
};

// Payload dùng khi connectUser
interface UserPayload {
  _id: string;
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action: PayloadAction<UserPayload>) => {
      const { _id = "", fullName = "", email = "", walletAddress = "", isAdmin = false, isTeacher = false } = action.payload;

      state.id = _id
      state.fullName = fullName;
      state.email = email;
      state.walletAddress = walletAddress;
      state.isAdmin = Boolean(isAdmin);
      state.isTeacher = Boolean(isTeacher);
      state.isConnected = true;
    },

    disconnectUser: (state) => {
      state.id = "";
      state.fullName = "";
      state.email = "";
      state.walletAddress = null;
      state.isAdmin = false;
      state.isTeacher = false;
      state.isConnected = false;
    },

    // Optional: cập nhật wallet khi giảng viên connect MetaMask sau login
    updateWallet: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { connectUser, disconnectUser, updateWallet } = userSlice.actions;
export default userSlice.reducer;
