import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------------------- TYPES --------------------
interface Subject {
  _id: string;
  name: string;
  code: string
}

interface UserState {
  id: string;
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
  subjects: Subject[];
  isConnected: boolean;
}

// Payload dùng khi connectUser
interface UserPayload {
  _id: string;
  fullName: string;
  email: string;
  walletAddress: string | null;
  isAdmin: boolean;
  isTeacher: boolean;
  subjects: Subject[];
}

// -------------------- INITIAL STATE --------------------
const initialState: UserState = {
  id: "",
  fullName: "",
  email: "",
  walletAddress: null,
  isAdmin: false,
  isTeacher: false,
  subjects: [],
  isConnected: false,
};

// -------------------- SLICE --------------------
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action: PayloadAction<UserPayload>) => {
      const {
        _id = "",
        fullName = "",
        email = "",
        walletAddress = null,
        isAdmin = false,
        isTeacher = false,
        subjects = [],
      } = action.payload;

      state.id = _id;
      state.fullName = fullName;
      state.email = email;
      state.walletAddress = walletAddress;
      state.isAdmin = Boolean(isAdmin);
      state.isTeacher = Boolean(isTeacher);
      state.subjects = subjects;
      state.isConnected = true;
    },

    disconnectUser: (state) => {
      state.id = "";
      state.fullName = "";
      state.email = "";
      state.walletAddress = null;
      state.isAdmin = false;
      state.isTeacher = false;
      state.subjects = [];
      state.isConnected = false;
    },

    updateWallet: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { connectUser, disconnectUser, updateWallet } = userSlice.actions;
export default userSlice.reducer;
