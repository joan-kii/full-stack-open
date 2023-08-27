// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useUserValue } from '../contexts/UserContext';

const BlogDetails = ({ blog, handleLikes, handleRemove }) => {
  const user = useUserValue();

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
      {blog.user.id === user.payload.id && (
        <button id="remove-btn" type="button" onClick={() => handleRemove()}>
          Remove
        </button>
      )}
    </div>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default BlogDetails;
