import axios from 'axios';

const token = localStorage.getItem('token');
const REACT_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const authToken = `Bearer ${token}`;

export const voteSuggestion = async (data) => {
  try {
    const res = axios.patch(`${REACT_SERVER_URL}/user/dashboard/suggestion`, data, {
      headers: {
        Authorization: authToken,
      },
    });
    return res;
  } catch (err) {
    const mute = err;
    return null;
  }
};
export const voteSuggestionComment = async (data) => {
  try {
    const res = axios.patch(`${REACT_SERVER_URL}/user/dashboard/suggestion/comment`, data, {
      headers: {
        Authorization: authToken,
      },
    });
    return res;
  } catch (err) {
    const mute = err;
    return null;
  }
};
export const getAllSuggestions = async () => {
  try {
    const res = axios.get(`${REACT_SERVER_URL}/user/dashboard/allSuggestions`, {
      headers: {
        Authorization: authToken,
      },
    });
    return res;
  } catch (err) {
    const mute = err;
    return null;
  }

  
};
