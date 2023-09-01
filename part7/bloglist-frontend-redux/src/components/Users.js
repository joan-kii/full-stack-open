import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const Users = () => {
  const usersList = useSelector(({ users }) => users);

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.dark',
          m: '1rem 0 1rem 0',
          textTransform: 'uppercase'
        }}
      >
        Users
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          m: '2rem auto',
          width: '50%'
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    color: 'primary.dark'
                  }}
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    color: 'primary.dark'
                  }}
                >
                  Blogs Created
                </Typography>
              </TableCell>
            </TableRow>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  <Link
                    component={RouterLink}
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      color: 'primary.dark'
                    }}
                  >
                    {user.blogs.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
