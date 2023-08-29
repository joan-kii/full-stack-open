/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogId = blog.title.toLowerCase().split(' ').join('-');

  return (
    <div id={blogId} style={blogStyle} className="blog">
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
