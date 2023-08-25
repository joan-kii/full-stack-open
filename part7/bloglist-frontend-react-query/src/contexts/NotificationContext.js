import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      state = `A new blog ${action.payload.title} by ${action.payload.author} added!`;
      return state;
    case 'ERROR':
      state = `${action.payload}`;
      return state;
    case 'VOTE':
      state = `You have voted ${action.payload}`;
      return state;
    default:
      state = '';
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

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
