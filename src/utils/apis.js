import { resquestNotificationPermission, getfirebaseToken } from '../notifications/firebase';

const handleNotification = async ({ Email }) => {
  try {
    const permission = await resquestNotificationPermission();
    if (permission === 'granted') {
      const notificationToken = await getfirebaseToken();
      console.log(notificationToken);
      const url = `${process.env.REACT_APP_SERVER_URL}/notification/addNotificationToken/web`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notification_token: notificationToken, Email }),
      });
    }
  } catch (error) {
    console.log('error', error);
  }
  return null;
};

const userLogin = async (code) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/auth/signin/web`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authCode: code }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export { userLogin, handleNotification };
