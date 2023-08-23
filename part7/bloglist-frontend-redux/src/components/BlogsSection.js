// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Blog from './Blog';
import loginService from '../services/login';

const BlogsSection = ({ user, setUser, children }) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
  };

  const blogsList = useSelector(({ blogs }) => blogs);

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
        {[...blogsList]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              blogs={blogsList}
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
