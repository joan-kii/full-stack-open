import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import blogService from '../services/blogs';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (newBlog) => {
      const blogsList = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogsList.concat(newBlog));
    },
    onError: (_err) => {
      dispatch({ type: 'ERROR', payload: 'Something went wrong...' });
      setTimeout(() => {
        dispatch({});
      }, 5000);
    }
  });

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    newBlogMutation.mutate(newBlog);
    dispatch({ type: 'CREATE', payload: newBlog });
    setTimeout(() => {
      dispatch({});
    }, 5000);
    setTitle('');
    setAuthor('');
    setUrl('');
    toggleVisibility();
  };

  return (
    <form onSubmit={handleCreate}>
      <h3>Create New Blog</h3>
      <div>
        Title:{' '}
        <input
          id="title-input"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:{' '}
        <input
          id="author-input"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:{' '}
        <input
          id="url-input"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-blog-btn" type="submit">
        Create Blog
      </button>
    </form>
  );
};

export default BlogForm;
