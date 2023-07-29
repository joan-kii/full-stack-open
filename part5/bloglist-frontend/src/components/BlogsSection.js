import Blog from './Blog';
import NewBlogSection from './NewBlogSection';
import loginService from '../services/login';

const BlogsSection = ({
  user,
  setUser,
  blogs,
  setBlogs,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
  };

  return (
    <>
      <h1>Blogs</h1>
      <h4>{user.name} logged in</h4>
      <button type="button" onClick={handleLogout}>Logout</button>
      <NewBlogSection user={user} blogs={blogs} setBlogs={setBlogs} />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

export default BlogsSection;
