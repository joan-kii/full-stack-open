import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

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
      <Stack
        mt={2}
        spacing={2}
        divider={<Divider flexItem />}
      >
        {[...blogsList]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Card key={blog.id} variant="outlined">
              <Blog
                blog={blog}
              />
            </Card>
          ))}
      </Stack>
    </div>
  );
};

export default BlogsSection;
