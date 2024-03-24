import { toast } from 'react-toastify';
import { resquestNotificationPermission, getfirebaseToken } from '../notifications/firebase';

const handleAuthError = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = process.env.REACT_APP_CLIENT_URL;
};

const Signin = async (code) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/auth/signin/web`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authCode: code }),
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.message === 'Unauthorized Access') {
      toast.error('Session Expired, Please Login Again');
    }
  }
  return null;
};

const handleNotification = async () => {
  try {
    const permission = await resquestNotificationPermission();
    if (permission === 'granted') {
      const notificationToken = await getfirebaseToken();
      // console.log(notificationToken);
      const url = `${process.env.REACT_APP_SERVER_URL}/user/addNotificationToken/web`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ notification_token: notificationToken }),
      });
    }
  } catch (error) {
    console.log('error', error);
  }
  return null;
};

const submitFeedback = async ({
  BreakfastRating,
  LunchRating,
  DinnerRating,
  SnacksRating,
  Comments,
  MessServiceRating,
  HygieneRating,
}) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/submitFeedback`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

      body: JSON.stringify({
        BreakfastRating,
        LunchRating,
        DinnerRating,
        SnacksRating,
        Comments,
        MessServiceRating,
        HygieneRating,
      }),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const getDashTimeTable = async () => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/timetable`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 401) {
      handleAuthError();
    }
    response = await response.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getManagerTimeTable = async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/timetable`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  response = await response.json();
  return response;
};

const giveRatingToFoodItem = async (foodId, rating) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/giveRating`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

      body: JSON.stringify({
        foodId,
        rating,
      }),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const createFoodItem = async (data) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/createFoodItem`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    console.log(data);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const getAllFoodIitems = async () => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/allFoodItems`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const addFoodItem = async (data) => {
  console.log(data);
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/addTimeTable`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

      body: JSON.stringify(data),
    });
    console.log(response);
    console.log(data);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const delFoodItem = async (data) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/deleteTimeTable`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    console.log(data);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const getFoodItemRating = async () => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/getItemRating`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 401) {
      handleAuthError();
    }
    return await response.json();
  } catch (error) {
    console.log({ error });
  }
  return null;
};

const addFeedbackForm = async (data) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/floatFeedbackForm`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    // Log specific properties or values from the response and data objects
    console.log('Response Status:', response.status);
    console.log('Data:', data);
    if (response.status === 200) {
      toast.success('Feedback form added successfully');
    }
    if (response.status === 400) {
      toast.error('Error adding feedback form');
    }

    return response;
  } catch (err) {
    toast.error('Error adding feedback form');
    console.log(err);
  }
  return null;
};

const addAnnouncementForm = async (data) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/makeAnnouncement`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    // Log specific properties or values from the response and data objects
    console.log('Response Status:', response.status);
    console.log('Data:', data);
    if (response.status === 200) {
      toast.success('Announcement added successfully');
    }
    if (response.status === 400) {
      toast.error('Error adding announcement');
    }
    return response;
  } catch (err) {
    toast.error('Error adding announcement');
    console.log(err);
  }
  return null;
};

const getFoodReviews = async () => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/getFoodReview`;
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    res = await res.json();
    if (res.status === 401) {
      handleAuthError();
    }
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const submitFoodReview = async (data) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/submitFoodReview`;
    console.log(data);
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export {
  Signin,
  handleNotification,
  submitFeedback,
  getDashTimeTable,
  giveRatingToFoodItem,
  createFoodItem,
  getAllFoodIitems,
  addFoodItem,
  delFoodItem,
  getFoodItemRating,
  getManagerTimeTable,
  addFeedbackForm,
  addAnnouncementForm,
  getFoodReviews,
  submitFoodReview,
};
