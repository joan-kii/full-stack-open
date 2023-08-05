import Toggable from './Toggable';
import BlogDetails from './BlogDetails';

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
  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author}</p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setInfoMessage={setInfoMessage}
          setErrorMessage={setErrorMessage}
          setIsError={setIsError}
        />
      </Toggable>
    </div>
  );
};

export default Blog;
