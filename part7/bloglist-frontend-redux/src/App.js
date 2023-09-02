import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import BlogsSection from './components/BlogsSection';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import Navigation from './components/Navigation';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersListReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const actualUser = useSelector(({ user }) => user);

  useEffect(() => {
    async function getBlogs() {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }

    const loggedUser = localStorage.getItem('user');

    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
      blogService.setToken(JSON.parse(loggedUser).token);
      getBlogs();
    }
  }, []);

  return (
    <CssBaseline>
      <Router>
        <Navigation />
        {actualUser && (
          <Container>
            <Routes>
              <Route path="/" element={<BlogsSection />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
          </Container>
        )}
        {!actualUser && (
          <LoginSection />
        )}
        <Notification />
      </Router>
    </CssBaseline>
  );
};

export default App;
