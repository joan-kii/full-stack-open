/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogsList = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    async function getBlogs() {
      dispatch(initializeBlogs());
    }
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      blogService.setToken(JSON.parse(loggedUser).token);
      getBlogs();
    }
  }, []);

  const addBlog = async (blog) => {
    try {
      const savedBlog = await blogService.createBlog(blog);
      dispatch(showNotification({
        text: `A new blog ${savedBlog.title} by ${savedBlog.author} added!`,
        isError: false
      }));
      dispatch(initializeBlogs(savedBlog));
    } catch (_error) {
      dispatch(showNotification({
        text: 'Something went wrong...',
        isError: true
      }));
    }
  };

  return (
    <>
      <Notification />
      {user && (
        <BlogsSection
          user={user}
          setUser={setUser}
          blogs={blogsList}
          setBlogs={initializeBlogs}
        >
          <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
            <BlogForm />
          </Toggable>
        </BlogsSection>
      )}
      {!user && (
        <LoginSection
          setUser={setUser}
          setBlogs={initializeBlogs}
        />
      )}
    </>
  );
};

export default App;
