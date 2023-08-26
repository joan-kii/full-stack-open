import { useState, useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      blogService.setToken(JSON.parse(loggedUser).token);
    }
  }, []);

  return (
    <>
      <Notification />
      {user && (
        <BlogsSection
          user={user}
          setUser={setUser}
        >
          <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
            <BlogForm />
          </Toggable>
        </BlogsSection>
      )}
      {!user && (
        <LoginSection
          setUser={setUser}
        />
      )}
    </>
  );
};

export default App;
