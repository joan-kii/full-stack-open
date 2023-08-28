import { useSelector } from 'react-redux';

import Blog from './Blog';
import Toggable from './Toggable';
import BlogForm from './BlogForm';

const BlogsSection = ({ children }) => {
  const blogsList = useSelector(({ blogs }) => blogs);

  return (
    <div>
      {children}
      <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
        <BlogForm />
      </Toggable>
      {[...blogsList]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  );
};

export default BlogsSection;
