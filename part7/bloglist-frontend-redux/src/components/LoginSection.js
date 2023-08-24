import { useState } from 'react';
import { useDispatch } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';
import { initializeBlogs } from '../reducers/blogReducer';

const LoginSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatch(initializeBlogs());
      dispatch(showNotification({
        text: `${loggedUser.name} is logged!`,
        isError: false
      }));
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(showNotification({
        text: 'Wrong Username or Password',
        isError: true
      }));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        Username:{' '}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{' '}
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-btn">
        Login
      </button>
    </form>
  );
};

export default LoginSection;
