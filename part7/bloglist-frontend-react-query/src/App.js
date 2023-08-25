import { useState, useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useNotificationDispatch } from './contexts/NotificationContext';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useNotificationDispatch();

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
      dispatch({ type: 'CREATE', payload: savedBlog });
      setTimeout(() => {
        dispatch({});
      }, 5000);
      setBlogs(blogs.concat(savedBlog));
    } catch (error) {
      dispatch({ type: 'ERROR', payload: 'Something went wrong...' });
    }
  };

  return (
    <>
      {errorMessage && (
        <Notification message={errorMessage} isError={isError} />
      )}
      {infoMessage && <Notification message={infoMessage} isError={isError} />}
      {user && (
        <BlogsSection
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
          setInfoMessage={setInfoMessage}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
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
          setErrorMessage={setErrorMessage}
          setInfoMessage={setInfoMessage}
          setIsError={setIsError}
        />
      )}
    </>
  );
};

export default App;
