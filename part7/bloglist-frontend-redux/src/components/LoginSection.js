import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <Typography
        variant="h3"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.dark',
          m: '1rem 0 2rem 0',
          textTransform: 'uppercase'
        }}
      >
        Log in to application
      </Typography>
      <Box
        sx={{
          m: '1rem auto',
          width: '25%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          id="username"
          value={username}
          label="Username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          sx={{
            mb: '1.5rem'
          }}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          label="Password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          sx={{
            mb: '1.5rem'
          }}
        />
        <Button
          type="submit"
          id="login-btn"
          variant="outlined"
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginSection;
