// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Toggable from './Toggable';
import BlogDetails from './BlogDetails';

const Blog = ({
  blog, user, blogs, setBlogs, setInfoMessage, setErrorMessage, setIsError,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}</p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setInfoMessage={setInfoMessage}
          setErrorMessage={setErrorMessage}
          setIsError={setIsError}
        />
      </Toggable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
};

export default Blog;
