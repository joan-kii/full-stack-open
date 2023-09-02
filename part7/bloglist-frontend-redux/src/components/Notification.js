import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Notification = () => {
  const message = useSelector(({ notification }) => notification);
  console.log(message);

  return (
    <Alert
      id="notification"
      variant="outlined"
      severity={message.isError ? 'error' : 'success'}
      sx={{
        m: '0 auto',
        display: message.text ? '' : 'none',
        width: '50%'
      }}
    >
      <AlertTitle>{message.text}</AlertTitle>
    </Alert>
  );
};

export default Notification;
