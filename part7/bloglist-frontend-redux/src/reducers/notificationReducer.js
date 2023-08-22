import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    isError: false
  },
  reducers: {
    setNotification(state, action) {
      state.text = action.payload.text;
      state.isError = action.payload.isError;
      return state;
    },
    resetNotification(state, _action) {
      state.text = '';
      state.isError = false;
      return state;
    }
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

// eslint-disable-next-line arrow-body-style
export const showNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
