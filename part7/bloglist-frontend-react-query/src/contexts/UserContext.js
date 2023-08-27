import { createContext, useReducer, useContext } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return { isError: true, payload: {}, isLogged: false };
    case 'LOGGED_IN':
      return { ...state, payload: { ...action.payload }, isLogged: true };
    case 'LOGGED_OUT':
      return { ...state, payload: {}, isLogged: false };
    default:
      return { payload: {}, isError: false, isLogged: false };
  }
};

const UserContext = createContext();

const initialState = {
  payload: {},
  isLogged: false,
  isError: false
};

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);

  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);

  return userAndDispatch[1];
};

export default UserContext;
