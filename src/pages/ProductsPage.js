import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import { wrap } from 'lodash';
import { Navigate } from 'react-router-dom';
import ApiContext from '../Context/apiContext';
import { submitFeedback } from '../utils/apis';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HoverRating() {
  const [BreakfastRating, setBreakfastRatings] = React.useState(null);
  const [LunchRating, setLunchRatings] = React.useState(null);
  const [SnacksRating, setsnacksRatings] = React.useState(null);
  const [DinnerRating, setdinnerRatings] = React.useState(null);
  const [HygieneRating, sethygieneRatings] = React.useState(null);
  const [MessServiceRating, setmessServiceRatings] = React.useState(null);
  const [Comments, setcomments] = React.useState(null);
  const [user, setUser] = useState({});
  const getUser = async () => {
    let user = await localStorage.getItem('user');
    user = await JSON.parse(user);
    setUser(user);
  };

  const context = useContext(ApiContext);
  const { getAllNotitfications } = context;
  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log('error');
    }
  }, []);

  const handleSubmitPress = async () => {
    if (!BreakfastRating || !LunchRating || !SnacksRating || !DinnerRating || !HygieneRating || !MessServiceRating) {
      alert('Please Rate all fields');
    } else {
      const res = await submitFeedback({
        FormID: localStorage.getItem('feedbackId') || null,
        BreakfastRating,
        LunchRating,
        SnacksRating,
        DinnerRating,
        HygieneRating,
        MessServiceRating,
        Comments,
      });
      console.log(res);
      if (res.status === 200) {
        alert('Feedback Submitted');
        setOpen(true);
        localStorage.removeItem('feedbackId');
        
      } else {
        alert('Feedback Submission Failed');
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const vertical = 'top';
  const horizontal = 'center';
  const [open, setOpen] = useState(false);
  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={4000}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Rating submitted successfully!
        </Alert>
      </Snackbar>
      {user?.Role === 'manager' && <Navigate to="/404" />}
      {user?.Role === 'user' && (
         <Container maxWidth="xl">
         <Typography variant="h4" sx={{ mb: 5 }}>
           Feedback
         </Typography>
        <div>

          <Helmet>
            <title> Feedback </title>
          </Helmet>

          <Box sx={{ flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
              <Grid item alignItems="center" justifyContent="center" xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Breakfast
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ="
                        title=""
                      />
                      <Rating
                        name="breakfast-hover-feedback"
                        value={BreakfastRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          setBreakfastRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Lunch
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRvcdRG6Ahi21BcICuzay8pW1AWdLqvgFOw&usqp=CAU"
                        title=""
                      />
                      <Rating
                        name="lunch-hover-feedback"
                        value={LunchRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          setLunchRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Snacks
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQvV3IWgn7ebaOWxlSIIBUNF19SGTD_Ngyw&usqp=CAU"
                        title=""
                      />
                      <Rating
                        name="lunch-hover-feedback"
                        value={SnacksRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          setsnacksRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Dinner
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBWo70RdiTtAadAMbQCFA6E5hEG7W4nQ7rQhpNYKP6grmyhSmuU9_1jDUHk9_hbYBNBc&usqp=CAU"
                        title=""
                      />
                      <Rating
                        name="lunch-hover-feedback"
                        value={DinnerRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          setdinnerRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Hygiene
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqjJ4WNV0E0nmCGFLBZYUl_J6uOZyDMHKRA&usqp=CAU"
                        title=""
                      />
                      <Rating
                        name="lunch-hover-feedback"
                        value={HygieneRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          sethygieneRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Container>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Mess service
                      </Typography>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL4DPJnMsIakcrye0Yjrip3JHV29UmMpN9xvj3eHrlfI4Co1kYHN75575xUKXwNan2ci8&usqp=CAU"
                        title=""
                      />
                      <Rating
                        name="lunch-hover-feedback"
                        value={MessServiceRating}
                        precision={1}
                        onChange={(event, newValue) => {
                          setmessServiceRatings(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />}
                      />
                    </Container>
                  </Card>
                </Item>
              </Grid>
        
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography align="left" variant="h5" sx={{ mb: 1 }}>
              Additional Comments
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="outlined-basic"
              label="Comments"
              value={Comments}
              variant="outlined"
              onChange={(event) => {
                setcomments(event.target.value);
              }}
            />
          </Box>
          <br />
          
          <Button variant="contained" justifyContent='center' onClick={handleSubmitPress}>
            Submit
          </Button>
          
        </div>
        </Container>
      )}
    </>
  );
}
