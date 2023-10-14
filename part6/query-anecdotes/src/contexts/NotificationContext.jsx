import { createContext, useContext, useReducer  } from "react"

const initialState = {
  message: '',
  display: 'none'
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.payload, display: '' }
    case 'HIDE':
      return initialState
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationObject = () => useContext(NotificationContext)[0]

export const useNotificationDispatch = () => useContext(NotificationContext)[1]

export default NotificationContext