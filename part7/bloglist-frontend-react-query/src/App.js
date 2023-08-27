import { useEffect } from 'react';

import BlogsSection from './components/BlogsSection';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import LoginSection from './components/LoginSection';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useUserValue, useUserDispatch } from './contexts/UserContext';
import { useNotificationDispatch } from './contexts/NotificationContext';

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      userDispatch({ type: 'LOGGED_IN', payload: JSON.parse(loggedUser) });
      notificationDispatch({ type: 'LOGGED_IN', payload: JSON.parse(loggedUser) });
      setTimeout(() => {
        notificationDispatch({});
      }, 5000);
      blogService.setToken(JSON.parse(loggedUser).token);
    }
  }, []);

  return (
    <>
      <Notification />
      {user.isLogged && (
        <BlogsSection>
          <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
            <BlogForm />
          </Toggable>
        </BlogsSection>
      )}
      {!user.isLogged && (
        <LoginSection />
      )}
    </>
  );
};

export default App;
