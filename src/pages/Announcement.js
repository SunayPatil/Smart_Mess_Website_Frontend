import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { addFeedbackForm } from '../utils/apis';

function AnnouncementForm() {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = () => {
    addFeedbackForm({ title, description }).then((res) => {
      console.log(res);
    });
  };

  const getUser = async () => {
    let user = await localStorage.getItem('user');
    user = await JSON.parse(user);
    setUser(user);
  };

  return (
    <Container maxWidth="lg">
      {user?.Role === 'user' ? (
        <Navigate to="/404" />
      ) : (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            Announcement
          </Typography>
          <form>
            <TextField
              label="Title"
              required
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Description"
              required
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </>
      )}
    </Container>
  );
}

export default AnnouncementForm;