import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle('');
    setAuthor('');
    setUrl('');
    toggleVisibility();
  };

  return (
    <form onSubmit={handleCreate}>
      <Box
        sx={{
          m: '1rem auto',
          width: '25%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          id="title-input"
          label="Title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          sx={{
            mb: '1.5rem'
          }}
        />
        <TextField
          id="author-input"
          label="Author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          sx={{
            mb: '1.5rem'
          }}
        />
        <TextField
          id="url-input"
          label="Url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          sx={{
            mb: '1.5rem'
          }}
        />
        <Button
          id="create-blog-btn"
          type="submit"
          variant="outlined"
        >
          Create Blog
        </Button>
      </Box>
    </form>
  );
};

export default BlogForm;
