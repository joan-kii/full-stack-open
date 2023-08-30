/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { showNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog, newComment } from '../reducers/blogReducer';

const BlogDetails = () => {
  const [comment, setComment] = useState('');
  const actualUser = useSelector(({ user }) => user);
  const blogsList = useSelector(({ blogs }) => blogs);
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = blogsList.find((el) => el.id === id);

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      dispatch(likeBlog(updatedBlog));
      dispatch(showNotification({
        text: `You liked ${blog.title}!`,
        isError: false
      }));
    } catch (_error) {
      dispatch(showNotification({
        text: 'Something went wrong...',
        isError: true
      }));
    }
  };

  const handleRemove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(showNotification({
          text: `The blog ${blog.title} by ${blog.author} was removed!`,
          isError: false
        }));
      } catch (_error) {
        dispatch(showNotification({
          text: 'Something went wrong...',
          isError: true
        }));
      }
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(newComment(blog.id, comment));
    setComment('');
  };

  return (
    (blog && (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href="#">{blog.url}</a>
      <div>
        <p id="likes">
          Likes: {blog.likes}{' '}
          <button id="like-btn" type="button" onClick={() => handleLikes()}>
            Like
          </button>
        </p>
      </div>
      <p>Added by {blog.user.name}</p>
      {blog.user.id === actualUser.id && (
        <button id="remove-btn" type="button" onClick={() => handleRemove()}>
          Remove
        </button>
      )}
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments.map((comm) => {
          const commentIndex = blog.comments.indexOf(comm);
          return <li key={blog.id + commentIndex}>{comm}</li>;
        })}
      </ul>
    </div>
    ))
  );
};

export default BlogDetails;
