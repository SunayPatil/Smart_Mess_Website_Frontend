import { useState } from 'react';
// import { toast } from 'react-toastify';
import ApiContext from './apiContext';

const ApiState = (props) => {
  const [notifications, setNotifications] = useState([]);
  const API_ENDPOINT = process.env.REACT_APP_SERVER_URL;

  const getAllNotificatons = async () => {
    try {
      const url = `${API_ENDPOINT}/user/dashboard/notifications`;
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      response = await response.json();
      response.forEach((item) => {
        item.id = item._id;
        item.title = item.Title;
        item.description = item.Description;
        item.avatar = null;
        item.type = item.messageType;
        item.createdAt = item.Date;
        item.isUnRead = !item.read;
      });
      setNotifications(response);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const markAsRead = async (id) => {
    console.log('mark as read ', id);
    try {
      const url = `${API_ENDPOINT}/user/dashboard/makeRead`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ notifId: id }), // Include the request body here
      });

      if (response.status === 200) {
        console.log('Notification marked as read');
        getAllNotificatons();
      } else {
        console.error('Unexpected error:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const url = `${API_ENDPOINT}/user/dashboard/makeAllRead`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        console.log('All notifications marked as read');
        getAllNotificatons();
      }
      return null;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  return (
    <ApiContext.Provider
      value={{
        getAllNotificatons,
        notifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiState;
