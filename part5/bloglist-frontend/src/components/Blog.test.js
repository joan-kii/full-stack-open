/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Blog from './Blog';

const blog = {
  title: 'My blog',
  author: 'Joan Serrano',
  url: 'https://notshown.com',
  likes: 12,
  id: 123,
  user: {
    name: 'Joan Serrano',
    id: 456,
  },
};

const user = {
  id: 456,
};

const blogs = [];

const setBlogs = jest.fn();
const setInfoMessage = jest.fn();
const setErrorMessage = jest.fn();
const setIsError = jest.fn();

test('Renders blog content', () => {
  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      blogs={blogs}
      setBlogs={setBlogs}
      setInfoMessage={setInfoMessage}
      setErrorMessage={setErrorMessage}
      setIsError={setIsError}
    />,
  );

  const blogDiv = container.querySelector('.blog');
  expect(blogDiv).toHaveTextContent(blog.title);
  expect(blogDiv).toHaveTextContent(blog.author);

  const urlElement = screen.getByText(`${blog.url}`);
  expect(urlElement).not.toBeVisible();

  const likesElement = screen.getByText(`Likes: ${blog.likes}`);
  expect(likesElement).not.toBeVisible();
});

test('Renders blog detail content', async () => {
  render(
    <Blog
      blog={blog}
      user={user}
      blogs={blogs}
      setBlogs={setBlogs}
      setInfoMessage={setInfoMessage}
      setErrorMessage={setErrorMessage}
      setIsError={setIsError}
    />,
  );

  const eventUser = userEvent.setup();
  const button = screen.getByText('View');
  await eventUser.click(button);

  const urlElement = screen.getByText(`${blog.url}`);
  expect(urlElement).toBeVisible();
  const likesElement = screen.getByText(`Likes: ${blog.likes}`);
  expect(likesElement).toBeVisible();
});
