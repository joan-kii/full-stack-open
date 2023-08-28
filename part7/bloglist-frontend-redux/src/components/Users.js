import { useSelector } from 'react-redux';

const Users = () => {
  const usersList = useSelector(({ users }) => users);
  console.log(usersList);

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
