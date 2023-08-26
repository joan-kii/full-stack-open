// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Blog from './Blog';
import loginService from '../services/login';
import blogService from '../services/blogs';

const BlogsSection = ({
  user,
  setUser,
  children,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
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
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
      </div>
    </>
  );
};

BlogsSection.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};

export default BlogsSection;
