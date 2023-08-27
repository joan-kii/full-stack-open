import { useQuery } from '@tanstack/react-query';

import Blog from './Blog';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useUserValue, useUserDispatch } from '../contexts/UserContext';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const BlogsSection = ({ children }) => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const handleLogout = () => {
    loginService.handleLogout();
    userDispatch({ type: 'LOGGED_OUT', payload: {} });
    notificationDispatch({ type: 'LOGGED_OUT', payload: {} });
    setTimeout(() => {
      notificationDispatch({});
    }, 5000);
  };

  const getBlogs = useQuery(['blogs'], blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false
  });

  const blogs = getBlogs.data;

  return (
    <>
      <div>
        <h1>Blogs</h1>
        <h4>{user.name} logged in</h4>
        <button id="logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
        {children}
        {blogs && blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </>
  );
};

export default BlogsSection;
