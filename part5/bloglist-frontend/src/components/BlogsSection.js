import Blog from './Blog';
import loginService from '../services/login';

const BlogsSection = ({
  user, setUser, blogs, createBlogVisible, setCreateBlogVisible, children,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
  };
  const labelButton = createBlogVisible ? 'Cancel' : 'Create New Blog';

  return (
    <>
      <div>
        <h1>Blogs</h1>
        <h4>{user.name} logged in</h4>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {children}
        <button type="button" onClick={() => setCreateBlogVisible((prev) => !prev)}>{labelButton}</button>
      </div>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

export default BlogsSection;
