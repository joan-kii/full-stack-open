// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useState } from 'react';

import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginSection = ({
  setUser, setBlogs, setErrorMessage, setInfoMessage, setIsError,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      const blogsList = await blogService.getAll();
      setBlogs(blogsList);
      setInfoMessage(`${loggedUser.name} is logged!`);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUsername('');
      setPassword('');
      setTimeout(() => {
        setInfoMessage('');
      }, 5000);
    } catch (error) {
      setIsError((prev) => !prev);
      setErrorMessage('Wrong Username or Password');
      setTimeout(() => {
        setIsError((prev) => !prev);
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        Username: <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginSection.propTypes = {
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
};

export default LoginSection;
