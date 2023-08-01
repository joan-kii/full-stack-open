const BlogDetails = (props) => {
  const { blog } = props;
  return (
    <div>
      <p>https://mystuff.com/{blog.url}</p>
      <p>{blog.likes}</p><button type="button">Like</button>
      <p>{blog.author}</p>
    </div>
  );
};

export default BlogDetails;
