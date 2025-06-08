import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload
        };
      }
    }
  }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
