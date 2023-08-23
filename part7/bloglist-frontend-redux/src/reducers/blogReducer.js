import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      state.splice(state.indexOf(action.payload.id), 1);
    },
    addLike(state, action) {
      state = state.map((b) => (b.id === action.payload.id ? action.payload : b));
    }
  },
});

export const {
  setBlogs, addBlog, removeBlog, addLike
} = blogSlice.actions;

// eslint-disable-next-line arrow-body-style
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

// eslint-disable-next-line arrow-body-style
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(content);
    dispatch(addBlog(newBlog));
  };
};

// eslint-disable-next-line arrow-body-style
export const deleteBlog = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogService.removeBlog(id);
    dispatch(removeBlog(removedBlog));
  };
};

// eslint-disable-next-line arrow-body-style
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateLikes(blog);
    dispatch(addLike(likedBlog));
  };
};

export default blogSlice.reducer;
