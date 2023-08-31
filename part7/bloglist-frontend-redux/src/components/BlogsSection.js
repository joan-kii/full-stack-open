import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Blog from './Blog';
import Toggable from './Toggable';
import BlogForm from './BlogForm';

const BlogsSection = ({ children }) => {
  const blogsList = useSelector(({ blogs }) => blogs);

  return (
    <div>
      <h1>Blog App</h1>
      {children}
      <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
        <BlogForm />
      </Toggable>
      <Stack
        mt={2}
        spacing={2}
        divider={<Divider flexItem />}
      >
        {[...blogsList]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
      </Stack>
    </div>
  );
};

export default BlogsSection;
