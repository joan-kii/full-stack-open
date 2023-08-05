import blogService from '../services/blogs';

const BlogDetails = (props) => {
  const {
    blog, user, blogs, setBlogs, setInfoMessage, setErrorMessage, setIsError,
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

  const handleRemove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
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
    <div>
      <p>{blog.url}</p>
      <div>
        <p>Likes: {blog.likes} <button type="button" onClick={handleLikes}>Like</button></p>
      </div>
      <p>{blog.user.name}</p>
      {blog.user.id === user.id && <button type="button" onClick={handleRemove}>Remove</button>}
    </div>
  );
};

export default BlogDetails;
