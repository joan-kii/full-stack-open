import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loggedUser',
  initialState: {
    name: '',
    username: '',
    password: ''
  },
  reducers: {
    setUsername(state, action) {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.password = action.payload.password;
      return state;
    }
  },
});

export const { setUsername } = loginSlice.actions;

export default loginSlice.reducer;
