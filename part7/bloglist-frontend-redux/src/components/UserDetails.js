import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const usersList = useSelector(({ users }) => users);
  const { id } = useParams();
  const user = usersList.find((el) => el.id === id);

  return (
    <>
      <h1>{user && user.name}</h1>
      <h3>Added Blogs</h3>
      <ul>
        {user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  );
};

export default UserDetails;
