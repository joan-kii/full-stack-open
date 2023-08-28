import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const { id } = useParams();
  console.log(id);
  const usersList = useSelector(({ users }) => users);
  // seguir aquí (usersList is empty)
  console.log(usersList);
  const user = usersList.find((el) => el.id === id);
  console.log(user);

  return (
    <>
      <h1>{user.name}</h1>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  );
};

export default UserDetail;
