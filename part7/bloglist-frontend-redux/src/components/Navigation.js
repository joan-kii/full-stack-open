import { useSelector, useDispatch } from 'react-redux';

import loginService from '../services/login';
import { removeUser } from '../reducers/userReducer';

const Navigation = () => {
  const actualUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    loginService.handleLogout();
    dispatch(removeUser());
  };

  return (
    <div>
      <h1>Blogs</h1>
      <h4>{actualUser.name} logged in</h4>
      <button id="logout-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navigation;
