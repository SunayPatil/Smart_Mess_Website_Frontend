import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Rate, Spin, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

// components
import MobileRatings from '../components/Ratings/RatingsMobile';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock
import {
  getDashTimeTable,
  giveRatingToFoodItem,
  getFoodItemRating,
  getFoodReviews,
  submitFoodReview,
} from '../utils/apis';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'foodItem', label: 'FoodItem', alignRight: false },
  { _id: 'rate', label: 'Rate', alignRight: false },
  { _id: 'comment', label: 'Comments', alignRight: false },
  { _id: 'ratings', label: 'Ratings', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b?.orderBy < a?.orderBy) {
    return -1;
  }
  if (b?.orderBy > a?.orderBy) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.MenuItem.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RatingsPage() {
  const laptop = useMediaQuery('(min-width:1024px)');
  const tablet = useMediaQuery('(max-width: 1024px)');
  const [user, setUser] = useState({});
  const getUser = async () => {
    let user = localStorage.getItem('user');
    user = await JSON.parse(user);
    setUser(user);
  };
  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      const mute = error;
    }
  }, []);
  const date = new Date();
  let today = date.getDay();
  const weekday = new Array(7);
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  weekday[0] = 'Sunday';
  today = weekday[today];
  const [timeTableData, setTimeTableData] = useState([]);
  const [todaysItems, setTodaysItems] = useState([]);
  const [todaysItemsRatings, setTodaysItemsRatings] = useState([]);
  const [ratedFoodItems, setRatedFoodItems] = useState([]);
  const [foodComment, setFoodComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentlyRating, setCurrentlyRating] = useState({ id: '', value: -1, comments: '' });

  const getRatedFoodItemVals = async () => {
    const res = await getFoodReviews();
    setRatedFoodItems(res);
  };

  const getAllRatingsData = async () => {
    const res = await getFoodItemRating();
    if (res?.length > 0) {
      setTodaysItemsRatings(res);
    }
  };

  const getTimeTableData = async () => {
    setLoading(true);
    const res = await getDashTimeTable();
    if (res?.length) {
      const ids = new Set();
      const todayItems = [];
      res.forEach((allDaysItems) => {
        if (allDaysItems.Day === today) {
          allDaysItems.Items.forEach((foodItem) => {
            if (!ids.has(foodItem?._id)) {
              todayItems.push(foodItem);
              ids.add(foodItem?._id);
            }
          });
        }
      });
      setTodaysItems(todayItems);
    }
    setTimeTableData(res);
    setLoading(false);
  };

  useEffect(() => {
    try {
      getAllRatingsData();
      getTimeTableData();
      getRatedFoodItemVals();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const vertical = 'top';
  const horizontal = 'center';
  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('FoodItem');

  const [filterMenuItem, setFilterMenuItem] = useState('');

  const filterItem = applySortFilter(todaysItems, getComparator(order, orderBy), filterMenuItem);

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
        <>
          <Helmet>
            <title> Ratings </title>
          </Helmet>

          <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Ratings
              </Typography>
            </Stack>

            <Card>
              <Scrollbar>
                <Spin spinning={loading} size="medium">
                  <MobileRatings timetable={timeTableData} ratings={todaysItemsRatings} />
                </Spin>
              </Scrollbar>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
