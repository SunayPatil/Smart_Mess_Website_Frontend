import { initializeApp } from 'firebase/app';
import { getMessaging,getToken } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const getfirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
    if (currentToken) {
      return currentToken;
    }
    console.log('No registration token available. Request permission to generate one.');
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
  return null;
};

export const resquestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('permission', permission);
    return permission;
  } catch (error) {
    console.log('error', error);
  }
  return null;
};
