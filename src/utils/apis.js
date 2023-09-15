const baseUrl = 'http://localhost:8000';

const userLogin = async (code) => {
  try {
    const url=`${baseUrl}/auth/signin/web`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authCode: code }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
  return null;
};

export { userLogin };
