// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Blog from './Blog';
import loginService from '../services/login';

const BlogsSection = ({
  user,
  setUser,
  blogs,
  setBlogs,
  children,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
  };

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
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          ))}
      </div>
    </>
  );
};

BlogsSection.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired
};

export default BlogsSection;
