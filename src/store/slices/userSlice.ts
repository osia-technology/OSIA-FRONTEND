import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    changePasswordSuccess: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
  },
});

export const { loginSuccess, logout, changePasswordSuccess } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthenticated = (state: { user: UserState }) => !!state.user.user;
