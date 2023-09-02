import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const UserDetails = () => {
  const usersList = useSelector(({ users }) => users);
  const { id } = useParams();
  const user = usersList.find((el) => el.id === id);

  return (
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
        {user && user.name}
      </Typography>
      <Typography
        variant="h5"
        color="primary.dark"
        sx={{
          mb: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}
      >
        Added Blogs
      </Typography>
      <List>
        {user && user.blogs.map((blog) => <ListItem sx={{ color: 'primary.dark' }} key={blog.id}>{blog.title}</ListItem>)}
      </List>
    </Box>
  );
};

export default UserDetails;
