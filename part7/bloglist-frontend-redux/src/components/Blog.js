/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogId = blog.title.toLowerCase().split(' ').join('-');

  return (
    <div id={blogId} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
