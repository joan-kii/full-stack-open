/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { showNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getBlogs() {
      const response = await blogService.getAll();
      setBlogs(response);
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
      setBlogs(blogs.concat(savedBlog));
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
          blogs={blogs}
          setBlogs={setBlogs}
        >
          <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
            <BlogForm addBlog={addBlog} />
          </Toggable>
        </BlogsSection>
      )}
      {!user && (
        <LoginSection
          setUser={setUser}
          setBlogs={setBlogs}
        />
      )}
    </>
  );
};

export default App;
