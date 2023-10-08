import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import { wrap } from 'lodash';
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

  const handleSubmitPress = async () => {
    if (!BreakfastRating || !LunchRating || !SnacksRating || !DinnerRating || !HygieneRating || !MessServiceRating) {
      alert('Please Rate all fields');
    } else {
      const res = await submitFeedback({
        FormID: '1',
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
      } else {
        alert('Feedback Submission Failed');
      }
    }
  };
  return (
    <>
      <Helmet>
        <title> Feedback </title>
      </Helmet>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Feedback
      </Typography>

      <Box sx={{ flexGrow: 1, flexWrap: 'wrap', justifyContent: "center" }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item alignItems="center" justifyContent="center"xs={12} lg={4} md={6}>
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
          <Grid item  xs={12} lg={4} md={6}>
            <Item>
              <Card sx={{ maxWidth: 345 }}>
                <Container>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Lunch
                  </Typography>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ="
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
          <Grid item  xs={12} lg={4} md={6}>
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
          <Grid item  xs={12} lg={4} md={6}>
            <Item>
              <Card sx={{ maxWidth: 345 }}>
                <Container>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Snacks
                  </Typography>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ="
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
          <Grid item  xs={12} lg={4} md={6}>
            <Item>
              <Card sx={{ maxWidth: 345 }}>
                <Container>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Dinner
                  </Typography>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ="
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
          <Grid item  xs={12} lg={4} md={6}>
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

      <Button variant="contained" onClick={handleSubmitPress}>
        Submit
      </Button>
    </>
  );
}
