import { useState, useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

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
      setInfoMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added!`);
      setBlogs(blogs.concat(savedBlog));
      setTimeout(() => {
        setInfoMessage('');
      }, 5000);
    } catch (error) {
      setIsError((prev) => !prev);
      setErrorMessage('Something went wrong...');
      setTimeout(() => {
        setIsError((prev) => !prev);
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <>
      {errorMessage && <Notification message={errorMessage} isError={isError} />}
      {infoMessage && <Notification message={infoMessage} isError={isError} />}
      {user
        && (
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
      {!user
        && (
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
