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
  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author}</p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails blog={blog} />
      </Toggable>
    </div>
  );
};

export default Blog;
