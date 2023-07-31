import { useState } from 'react';

import blogService from '../services/blogs';

const NewBlogSection = ({
  setInfoMessage, blogs, setBlogs, setIsError, setErrorMessage,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const savedBlog = await blogService.createBlog(newBlog);
      setInfoMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added!`);
      setBlogs(blogs.concat(savedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
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
  };

  return (
    <form onSubmit={handleCreate}>
      <h3>Create New Blog</h3>
      <div>
        Title: <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default NewBlogSection;
