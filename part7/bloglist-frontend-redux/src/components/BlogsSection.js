import { useSelector, useDispatch } from 'react-redux';

import Blog from './Blog';
import loginService from '../services/login';
import { removeUser } from '../reducers/userReducer';

const BlogsSection = ({ children }) => {
  const blogsList = useSelector(({ blogs }) => blogs);
  const actualUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    loginService.handleLogout();
    dispatch(removeUser());
  };

  return (
    <>
      <div>
        <h1>Blogs</h1>
        <h4>{actualUser.name} logged in</h4>
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
            />
          ))}
      </div>
    </>
  );
};

export default BlogsSection;
