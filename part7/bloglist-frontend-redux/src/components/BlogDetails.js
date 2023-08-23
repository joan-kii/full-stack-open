// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { showNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const BlogDetails = (props) => {
  const { blog, user } = props;

  const dispatch = useDispatch();

  const handleLikes = async () => {
    // Seguir aquí (rerender tras like)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      dispatch(likeBlog(updatedBlog));
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
        dispatch(deleteBlog(blog.id));
        dispatch(showNotification({
          text: `The blog ${blog.title} by ${blog.author} was removed!`,
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

  return (
    <div>
      <p>{blog.url}</p>
      <div>
        <p id="likes">
          Likes: {blog.likes}{' '}
          <button id="like-btn" type="button" onClick={() => handleLikes()}>
            Like
          </button>
        </p>
      </div>
      <p>{blog.user.name}</p>
      {blog.user.id === user.id && (
        <button id="remove-btn" type="button" onClick={() => handleRemove()}>
          Remove
        </button>
      )}
    </div>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default BlogDetails;
