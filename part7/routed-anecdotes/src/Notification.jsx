import { useNotificationObject } from "./contexts/NotificationContext"

const Notification = () => {
  const notification = useNotificationObject()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification.display
  }

  return (
    <div style={style}>
      { notification.message }
    </div>
  )
}

export default Notification
