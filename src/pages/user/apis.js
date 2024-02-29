import axios from 'axios';

const REACT_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const voteSuggestion = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
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

// export const getoneSuggestion = async (suggestionId) => {
//   try {
//     const res = await axios.get(
//       `${REACT_SERVER_URL}/user/profile/oneSuggestion`,
//       {
//         suggestionId: suggestionId,
//       },
//       {
//         headers: {
//           Authorization: authToken,
//         },
//       }
//     );
//     return res.data; // Assuming you want to return the data from the response
//   } catch (err) {
//     console.error('Error fetching suggestion:', err);
//     return null;
//   }
// };
export const getoneSuggestion = async (suggestionId) => {
  try {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    const res = await axios.get(`${REACT_SERVER_URL}/user/profile/oneSuggestion`, {
      params: {
        suggestionId: suggestionId,
      },
      headers: {
        Authorization: authToken,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};
