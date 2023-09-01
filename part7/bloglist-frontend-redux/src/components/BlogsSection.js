import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Blog from './Blog';
import Toggable from './Toggable';
import BlogForm from './BlogForm';

const BlogsSection = ({ children }) => {
  const blogsList = useSelector(({ blogs }) => blogs);

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.dark',
          m: '1rem 0 1rem 0',
          textTransform: 'uppercase'
        }}
      >
        Blog App
      </Typography>
      {children}
      <Toggable showButtonLabel="Create New Blog" hideButtonLabel="Cancel">
        <BlogForm />
      </Toggable>
      <Stack
        mt={4}
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
