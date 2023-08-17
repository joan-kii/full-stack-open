import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  // seguir aquí (setTimeout)
  switch (action.type) {
    case 'CREATION':
      state = `You have created a new anecdote ${action.payload}`
      return state
    case 'VOTE':
      state = `You have voted ${action.payload}`
      return state
    default:
      state = ''
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  ) 
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
