// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const BlogDetails = (props) => {
  const {
    blog, user, handleLikes, handleRemove,
  } = props;

  return (
    <div>
      <p>{blog.url}</p>
      <div>
        <p>Likes: {blog.likes} <button type="button" onClick={() => handleLikes()}>Like</button></p>
      </div>
      <p>{blog.user.name}</p>
      {blog.user.id === user.id && <button type="button" onClick={() => handleRemove()}>Remove</button>}
    </div>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default BlogDetails;
