import { useState, useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} />}
      {user
        ? <BlogsSection user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
        : <LoginSection setUser={setUser} setErrorMessage={setErrorMessage} setBlogs={setBlogs} />}
    </div>
  );
};

export default App;
