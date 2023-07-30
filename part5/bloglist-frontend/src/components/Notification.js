const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    ...notificationStyle,
    color: 'red',
  };

  const infoStyle = {
    ...notificationStyle,
    color: 'green',
  };

  return (
    <div style={isError ? errorStyle : infoStyle}>
      {message}
    </div>
  );
};

export default Notification;
