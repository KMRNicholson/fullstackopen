const Notification = ({ type, message }) => {
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const styles = {
    error: {
      ...style,
      color: 'red'
    },
    success: {
      ...style,
      color: 'green'
    }
  }

  return <div style={styles[type]}>{message}</div>
}

export default Notification