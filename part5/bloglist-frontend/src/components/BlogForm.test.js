/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import BlogForm from './BlogForm';

test('Create new blog', async () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'Test User',
    url: 'https://testurl.com',
  };
  const mockAddBlog = jest.fn();
  const mockToggle = jest.fn();
  const user = userEvent.setup();

  render(
    <BlogForm
      addBlog={mockAddBlog}
      toggleVisibility={mockToggle}
    />,
  );

  const inputs = screen.getAllByRole('textbox');
  const submitButton = screen.getByText('Create Blog');

  await user.type(inputs[0], `${testBlog.title}`);
  await user.type(inputs[1], `${testBlog.author}`);
  await user.type(inputs[2], `${testBlog.url}`);
  await user.click(submitButton);

  expect(mockAddBlog.mock.calls).toHaveLength(1);
  expect(mockAddBlog.mock.calls[0][0].title).toBe(`${testBlog.title}`);
  expect(mockAddBlog.mock.calls[0][0].author).toBe(`${testBlog.author}`);
  expect(mockAddBlog.mock.calls[0][0].url).toBe(`${testBlog.url}`);
});
