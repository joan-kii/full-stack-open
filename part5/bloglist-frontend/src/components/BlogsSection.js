import Blog from './Blog';
import loginService from '../services/login';
import blogService from '../services/blogs';

const BlogsSection = ({
  user, setUser, blogs, setBlogs, setInfoMessage,
  setIsError, setErrorMessage, children,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
  };

  const handleRemove = async (blog) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        const response = await blogService.removeBlog(blog.id);
        blogs.splice(blogs.indexOf(blog), 1);
        setBlogs(blogs);
        setInfoMessage(`The blog ${response.title} by ${response.author} was removed!`);
        setTimeout(() => {
          setInfoMessage('');
        }, 5000);
      } catch (error) {
        setIsError((prev) => !prev);
        setErrorMessage('Something went wrong...');
        setTimeout(() => {
          setIsError((prev) => !prev);
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <>
      <div>
        <h1>Blogs</h1>
        <h4>{user.name} logged in</h4>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {children}
        {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  );
};

export default BlogsSection;
