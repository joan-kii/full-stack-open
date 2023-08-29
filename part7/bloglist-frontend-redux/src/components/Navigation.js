import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {actualUser.name} logged in
      <button id="logout-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
      <h1>Blog App</h1>
    </div>
  );
};

export default Navigation;
