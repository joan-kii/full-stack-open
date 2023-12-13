import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SingleTodo from '../Todos/SingleTodo'

test('loads and displays home page', () => {
  const todo = {
    text: "Test text",
    done: true
  }
  render(<SingleTodo todo={todo} />)
  expect(screen.getByText(todo.text)).toBeInTheDocument()
})
