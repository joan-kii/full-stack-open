/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(({ notification }) => notification);

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: message.text ? 'block' : 'none'
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
    <div id="notification" style={message.isError ? errorStyle : infoStyle}>
      {message.text}
    </div>
  );
};

export default Notification;
