/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import BlogDetails from './BlogDetails';

test('Like button clicked twice', async () => {
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

  const mockHandler = jest.fn();
  render(
    <BlogDetails
      blog={blog}
      user={user}
      handleLikes={mockHandler}
      handleRemove={mockHandler}
    />,
  );

  const eventUser = userEvent.setup();
  const button = screen.getByText('Like');
  await eventUser.dblClick(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
