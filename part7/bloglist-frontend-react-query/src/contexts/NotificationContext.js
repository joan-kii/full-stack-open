import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      state.text = `A new blog ${action.payload.title} by ${action.payload.author} added!`;
      state.isError = false;
      return state;
    case 'ERROR':
      state.text = `${action.payload}`;
      state.isError = true;
      return state;
    case 'LIKE':
      state.text = `You have liked ${action.payload.title}`;
      state.isError = false;
      return state;
    case 'REMOVE':
      state.text = `You have removed ${action.payload.title}`;
      state.isError = false;
      return state;
    default:
      state.text = '';
      state.isError = false;
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    text: '',
    isError: false
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch[1];
};

export default NotificationContext;
