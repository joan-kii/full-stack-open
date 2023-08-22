/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from './reducers/notificationReducer';

export const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
});
