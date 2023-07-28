import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => setBlogs(fetchedBlogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService({ username, password });
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {user
        &&<> // seguir aquí
          <h1>Blogs</h1>
          {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </>
      }
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
