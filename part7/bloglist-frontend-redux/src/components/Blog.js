/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Toggable from './Toggable';
import BlogDetails from './BlogDetails';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';

const Blog = ({
  blog,
  user,
  blogs,
  setBlogs
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      await blogService.updateLikes(updatedBlog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (_error) {
      dispatch(showNotification({
        text: 'Something went wrong...',
        isError: true
      }));
    }
  };

  const handleRemove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.removeBlog(blog.id);
        blogs.splice(blogs.indexOf(blog), 1);
        setBlogs(blogs);
        dispatch(showNotification({
          text: `The blog ${response.title} by ${response.author} was removed!`,
          isError: false
        }));
      } catch (_error) {
        dispatch(showNotification({
          text: 'Something went wrong...',
          isError: true
        }));
      }
    }
  };

  const blogId = blog.title.toLowerCase().split(' ').join('-');

  return (
    <div id={blogId} style={blogStyle} className="blog">
      <p>
        {blog.title} by {blog.author}
      </p>
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
  setBlogs: PropTypes.func.isRequired
};

export default Blog;
