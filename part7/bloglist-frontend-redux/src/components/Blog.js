/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

import Toggable from './Toggable';
import BlogDetails from './BlogDetails';

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
        {blog.title} by {blog.author}
      </p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails
          blog={blog}
        />
      </Toggable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
