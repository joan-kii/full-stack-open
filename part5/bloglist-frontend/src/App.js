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
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      blogService.setToken(JSON.parse(loggedUser).token);
    }
    async function getBlogs() {
      const response = await blogService.getAll();
      setBlogs(response);
    }
    getBlogs();
  }, []);

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} isError={isError} />}
      {infoMessage && <Notification message={infoMessage} isError={isError} />}
      {user
        && (
          <BlogsSection user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs}>
            <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
              <BlogForm
                setInfoMessage={setInfoMessage}
                blogs={blogs}
                setBlogs={setBlogs}
                setIsError={setIsError}
                setErrorMessage={setErrorMessage}
              />
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
    </div>
  );
};

export default App;
