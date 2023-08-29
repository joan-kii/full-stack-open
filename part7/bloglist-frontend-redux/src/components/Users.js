import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const usersList = useSelector(({ users }) => users);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td><b>Blogs Created</b></td>
          </tr>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
