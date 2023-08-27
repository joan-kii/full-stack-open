import { useState } from 'react';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { useUserDispatch } from '../contexts/UserContext';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const LoginSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      blogService.setToken(loggedUser.token);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      userDispatch({ type: 'LOGGED_IN', payload: loggedUser });
      notificationDispatch({ type: 'LOGGED_IN', payload: loggedUser });
      setTimeout(() => {
        notificationDispatch({});
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (_error) {
      notificationDispatch({ type: 'ERROR', payload: 'Something went wrong...' });
      setTimeout(() => {
        notificationDispatch({});
      }, 5000);
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
