// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useState } from 'react';

import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginSection = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
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

LoginSection.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginSection;
