import { useState, useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';

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
      setBlogs(JSON.parse(loggedUser).blogs);
    }
  }, []);

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} isError={isError} />}
      {infoMessage && <Notification message={infoMessage} isError={isError} />}
      {user
        ? (
          <BlogsSection
            user={user}
            setUser={setUser}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setInfoMessage={setInfoMessage}
            setIsError={setIsError}
          />
        )
        : (
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
