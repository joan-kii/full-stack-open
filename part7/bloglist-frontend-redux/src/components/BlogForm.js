import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
