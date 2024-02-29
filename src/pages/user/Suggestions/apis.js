import axios from 'axios';

const REACT_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getUserSuggestion = async () => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    const res = await axios.post(`${REACT_SERVER_URL}/user/profile/suggestion`, data, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    const mute = err;
    // console.log(mute);
    return mute.response;
  }
};

export const postSuggestionComment = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    const res = await axios.post(`${REACT_SERVER_URL}/user/profile/suggestion/comment`, data, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json', // Change content type to application/json
      },
    });
    return res;
  } catch (err) {
    console.error('Error posting suggestion comment:', err);
    throw err;
  }
};

export const patchUserSuggestion = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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

export const deleteUserSuggestionComment = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    console.log('data', data);
    const res = await axios.post(
      `${REACT_SERVER_URL}/user/profile/suggestion/deleteComment`,
      {
        commentId: data.commentId,
        suggestionId: data.suggestionId,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const markAsresolved = async (suggestionId) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    const res = await axios.patch(
      `${REACT_SERVER_URL}/user/profile/suggestion/markAsClosed`,
      {
        suggestionId: suggestionId,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};
