import blogService from '../services/blogs';

const BlogDetails = (props) => {
  const {
    blog, user, blogs, setBlogs, handleRemove,
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
      <p>{blog.url}</p>
      <div>
        <p>Likes: {blog.likes} <button type="button" onClick={handleLikes}>Like</button></p>
      </div>
      <p>{blog.user.name}</p>
      {blog.user.id === user.id && <button type="button" onClick={() => handleRemove(blog)}>Remove</button>}
    </div>
  );
};

export default BlogDetails;
