import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  walletAddress: string | null;
  isConnected: boolean;
}

const initialState: UserState = {
  name: null,
  walletAddress: null,
  isConnected: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action: PayloadAction<{ name: string; walletAddress: string }>) => {
      state.name = action.payload.name;
      state.walletAddress = action.payload.walletAddress;
      state.isConnected = true;
    },
    disconnectUser: (state) => {
      state.name = null;
      state.walletAddress = null;
      state.isConnected = false;
    },
  },
});

export const { connectUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;
