const baseUrl = 'http://localhost:8000/';

const userLogin = async (code) => {
  const url = `${baseUrl}signup`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent:': 'WebApp',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ authCode: code }),
  });
  return response.json();
};

export {userLogin};