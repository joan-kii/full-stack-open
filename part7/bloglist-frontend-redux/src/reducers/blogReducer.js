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
      const blogToUpdate = state.findIndex((b) => (b.id === action.payload.id));
      state[blogToUpdate].likes += 1;
    },
    addComment(state, action) {
      const blogToUpdate = state.findIndex((b) => b.id === action.payload.blogId);
      state[blogToUpdate].comments.push(action.payload.comment);
    }
  },
});

export const {
  setBlogs, addBlog, removeBlog, addLike, addComment
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

// eslint-disable-next-line arrow-body-style
export const newComment = (blogId, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blogId, comment);
    dispatch(addComment({ blogId, comment }));
  };
};

export default blogSlice.reducer;
