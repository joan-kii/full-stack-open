import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateLikes = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config);
  return response.data;
};

export default {
  setToken,
  getAll,
  createBlog,
  updateLikes,
};
