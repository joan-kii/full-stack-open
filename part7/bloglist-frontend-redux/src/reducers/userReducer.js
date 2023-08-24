import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = {
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        token: action.payload.token
      };
      state = user;
      return state;
    },
    removeUser(state, _action) {
      state = null;
      return state;
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
