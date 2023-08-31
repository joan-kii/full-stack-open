import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
        </Box>
        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-around' }}>
          {actualUser && <Typography>{actualUser.name} is logged in</Typography>}
          <Button id="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
