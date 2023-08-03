import Blog from './Blog';
import loginService from '../services/login';

const BlogsSection = ({
  user, setUser, blogs, setBlogs, children,
}) => {
  const handleLogout = () => {
    loginService.handleLogout();
    setUser(null);
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
          />
        ))}
      </div>
    </>
  );
};

export default BlogsSection;
