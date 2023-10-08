import { resquestNotificationPermission, getfirebaseToken } from '../notifications/firebase';

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
    return response;
  } catch (err) {
    console.log(err);
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
        body: JSON.stringify({ notification_token: notificationToken}),
      });
    }
  } catch (error) {
    console.log('error', error);
  }
  return null;
};


const submitFeedback = async ({
  FormID,
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
        FormID,
        BreakfastRating,
        LunchRating,
        DinnerRating,
        SnacksRating,
        Comments,
        MessServiceRating,
        HygieneRating,
      }),
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const getDashTimeTable = async()=>{
  const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/timetable`
  let response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  response = await response.json()
  return response

}

const giveRatingToFoodItem = async({foodId, rating})=>{
  
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/user/dashboard/giveRating`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

      body: JSON.stringify({
        foodId,
        rating
      }),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
  return null;
}
  



export { Signin, handleNotification,submitFeedback, getDashTimeTable, giveRatingToFoodItem };
