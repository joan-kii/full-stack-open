// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Toggable from './Toggable';
import BlogDetails from './BlogDetails';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const likeBlogMutation = useMutation(blogService.updateLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (_err) => {
      dispatch({ type: 'ERROR', payload: 'Something went wrong...' });
      setTimeout(() => {
        dispatch({});
      }, 5000);
    }
  });

  const removeBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (_err) => {
      dispatch({ type: 'ERROR', payload: 'Something went wrong...' });
      setTimeout(() => {
        dispatch('');
      }, 5000);
    }
  });

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlogMutation.mutate(updatedBlog);
    dispatch({ type: 'LIKE', payload: updatedBlog });
    setTimeout(() => {
      dispatch({});
    }, 5000);
  };

  const handleRemove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog.id);
      dispatch({ type: 'REMOVE', payload: blog });
      setTimeout(() => {
        dispatch({});
      }, 5000);
    }
  };

  const blogId = blog.title.toLowerCase().split(' ').join('-');

  return (
    <div id={blogId} style={blogStyle} className="blog">
      <p>
        {blog.title} by {blog.author}
      </p>
      <Toggable showButtonLabel="View" hideButtonLabel="Hide">
        <BlogDetails
          blog={blog}
          handleLikes={handleLikes}
          handleRemove={handleRemove}
        />
      </Toggable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
