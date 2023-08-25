import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const actualUser = useSelector(({ user }) => user);

  useEffect(() => {
    async function getBlogs() {
      dispatch(initializeBlogs());
    }

    const loggedUser = localStorage.getItem('user');

    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
      blogService.setToken(JSON.parse(loggedUser).token);
      getBlogs();
    }
  }, []);

  return (
    <>
      <Notification />
      {actualUser && (
        <BlogsSection>
          <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
            <BlogForm />
          </Toggable>
        </BlogsSection>
      )}
      {!actualUser && (
        <LoginSection />
      )}
    </>
  );
};

export default App;
