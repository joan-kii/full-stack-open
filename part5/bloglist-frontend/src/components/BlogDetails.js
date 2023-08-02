import blogService from '../services/blogs';

const BlogDetails = (props) => {
  const {
    blog, user, blogs, setBlogs,
  } = props;
  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: user.id,
    };
    const response = await blogService.updateLikes(updatedBlog);
    setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)));
  };
  return (
    <div>
      <p>https://mystuff.com/{blog.url}</p>
      <div>
        <p>Likes: {blog.likes} <button type="button" onClick={handleLikes}>Like</button></p>
      </div>
      <p>{user.name}</p>
    </div>
  );
};

export default BlogDetails;
