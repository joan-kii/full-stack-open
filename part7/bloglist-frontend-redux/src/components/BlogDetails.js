/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

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
    <>
      <Box
        sx={{
          m: '2rem auto',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{
            mb: '1rem',
            fontSize: '1.6rem',
            fontWeight: 'bold'
          }}
        >
          {blog.title} by {blog.author}
        </Typography>
        <Link href="#">{blog.url}</Link>
        <Box>
          <Typography
            id="likes"
            color="primary.dark"
            mt={2}
          >
            Likes: {blog.likes}{' '}
          </Typography>
          <Button
            id="like-btn"
            variant="outlined"
            color="success"
            sx={{
              mt: '1rem'
            }}
            onClick={() => handleLikes()}
          >
            Like
          </Button>
        </Box>
        <Typography
          m={2}
          color="primary.dark"
        >
          Added by {blog.user.name}
        </Typography>
        {blog.user.id === actualUser.id && (
          <Button
            id="remove-btn"
            variant="outlined"
            color="error"
            onClick={() => handleRemove()}
          >
            Remove
          </Button>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          m: '2rem auto',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{
            mb: '1rem',
            fontSize: '1.6rem',
            fontWeight: 'bold'
          }}
        >
          Comments
        </Typography>
        <List>
          {blog.comments.map((comm) => {
            const commentIndex = blog.comments.indexOf(comm);
            return <ListItem sx={{ color: 'primary.dark' }} key={blog.id + commentIndex}>{comm}</ListItem>;
          })}
        </List>
        <form onSubmit={handleComment}>
          <Box
            sx={{
              m: '2rem auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h5"
              color="primary.dark"
              sx={{
                mb: '1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              Add your comment
            </Typography>
            <TextField
              value={comment}
              name="comment"
              label="Comment"
              variant="outlined"
              onChange={({ target }) => setComment(target.value)}
            />
            <Button
              type="submit"
              color="success"
              variant="outlined"
              sx={{
                mt: '2rem'
              }}
            >
              Add Comment
            </Button>
          </Box>
        </form>
      </Box>
    </>
    ))
  );
};

export default BlogDetails;
