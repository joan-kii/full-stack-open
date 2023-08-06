// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Toggable from './Toggable';
import BlogDetails from './BlogDetails';
import blogService from '../services/blogs';

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

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: user.id,
    };
    const response = await blogService.updateLikes(updatedBlog);
    setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)));
  };

  const handleRemove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.removeBlog(blog.id);
        blogs.splice(blogs.indexOf(blog), 1);
        setBlogs(blogs);
        setInfoMessage(`The blog ${response.title} by ${response.author} was removed!`);
        setTimeout(() => {
          setInfoMessage('');
        }, 5000);
      } catch (error) {
        setIsError((prev) => !prev);
        setErrorMessage('Something went wrong...');
        setTimeout(() => {
          setIsError((prev) => !prev);
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <p>{blog.title} by {blog.author}</p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails
          blog={blog}
          user={user}
          handleLikes={handleLikes}
          handleRemove={handleRemove}
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
