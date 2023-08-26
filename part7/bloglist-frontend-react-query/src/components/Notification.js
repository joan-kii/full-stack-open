import { useNotificationValue } from '../contexts/NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  console.log(notification);

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: notification.text ? 'block' : 'none'
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
    <div id="notification" style={notification.isError ? errorStyle : infoStyle}>
      {notification.text}
    </div>
  );
};

export default Notification;
