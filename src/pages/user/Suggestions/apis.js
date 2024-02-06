import axios from 'axios';

const token = localStorage.getItem('token');
const REACT_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const authToken = `Bearer ${token}`;

export const getUserSuggestion = async () => {
  try {
    const res = await axios.get(`${REACT_SERVER_URL}/user/profile/suggestion`, {
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

export const postUserSuggestion = async (data) => {
  try {
    const res = await axios.post(`${REACT_SERVER_URL}/user/profile/suggestion`, data, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'multipart/form-data'
      },
    });
    return res;
  } catch (err) {
    const mute = err;
    return null;
  }
};

export const patchUserSuggestion = async (data) => {
  try {
    const res = await axios.patch(`${REACT_SERVER_URL}/user/profile/suggestion`, data, {
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

export const deleteUserSuggestion = async (data) => {
  try {
    const res = await axios.delete(`${REACT_SERVER_URL}/user/profile/suggestion`, {
      params: {
        suggestionId: data.suggestionId,
      },
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
