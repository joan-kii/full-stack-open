import { createSlice } from '@reduxjs/toolkit';

import usersService from '../services/users';

const usersListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload;
    }
  },
});

export const { setUsers } = usersListSlice.actions;

// eslint-disable-next-line arrow-body-style
export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export default usersListSlice.reducer;
