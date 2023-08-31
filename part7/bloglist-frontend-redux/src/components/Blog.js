/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Blog = ({ blog }) => {
  const blogId = blog.title.toLowerCase().split(' ').join('-');

  return (
    <Button href={`/blogs/${blog.id}`} id={blogId} className="blog">{blog.title} by {blog.author}</Button>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
