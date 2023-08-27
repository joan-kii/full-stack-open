import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return { ...state, text: `A new blog ${action.payload.title} by ${action.payload.author} added!` };
    case 'ERROR':
      return { isError: true, text: `${action.payload}` };
    case 'LIKE':
      return { ...state, text: `You have liked ${action.payload.title}` };
    case 'REMOVE':
      return { ...state, text: `You have removed ${action.payload.title}` };
    case 'LOGGED_IN':
      return { ...state, text: `${action.payload.name} is logged in!` };
    case 'LOGGED_OUT':
      return { ...state, text: 'User logged out!' };
    default:
      return { text: '', isError: false };
  }
};

const NotificationContext = createContext();

const initialState = {
  text: '',
  isError: false
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

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
