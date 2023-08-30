import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
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
  const response = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate,
    config
  );
  return response.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment }, config);
  return response.data;
};

export default {
  setToken,
  getAll,
  createBlog,
  updateLikes,
  removeBlog,
  addComment
};
