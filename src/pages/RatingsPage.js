import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { Rate, Spin } from 'antd';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getDashTimeTable, giveRatingToFoodItem , getFoodItemRating} from '../utils/apis';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'foodItem', label: 'FoodItem', alignRight: false },
  { _id: 'rate', label: 'Rate', alignRight: false },
  { _id: 'ratings', label: 'Ratings', alignRight: false },

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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
  const [user, setUser] = useState({})
  const getUser = async()=>{
    let user = await localStorage.getItem("user")
    user = await JSON.parse(user)
    setUser(user)
  }
  useEffect(()=>{
    try {
      getUser()
    } catch (error) {
      console.log("error")
    }
  }, [])
  const date = new Date()
  let today = date.getDay()
  const weekday=new Array(7);
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";
  weekday[0]="Sunday";
// console.log(today)
  today = weekday[today]
  console.log(today)
  const [timeTableData, setTimeTableData] = useState([])
  const [todaysItems, setTodaysItems] = useState([])
  const [todaysItemsRatings, setTodaysItemsRatings] = useState([])

  const [loading, setLoading] = useState(false)
  console.log(todaysItemsRatings)
  const getAllRatingsData = async()=>{

    const res = await getFoodItemRating()

      if(res?.length>0){
        setTodaysItemsRatings(res)
      }
  }
  const getTimeTableData = async ()=>{
    setLoading(true)
    const res = await getDashTimeTable()
    console.log(res)
    if(res?.length){
      const temp = []
      res?.forEach((item)=>{
        if(item.Day === today){
          temp.push(...item.Items)
        }
      })
      setTodaysItems(temp)
    }
    setTimeTableData(res)
    setLoading(false)
   
  }
  useEffect(()=>{
    try {
      getTimeTableData()
      getAllRatingsData()
    } catch (error) {
      setLoading(false)
    }
  }, [])
 
 console.log(todaysItems)
 const timeTableWithRatings = []
 todaysItems?.forEach((item)=>{
  todaysItemsRatings?.forEach((rat)=>{
    if(item._id === rat.FoodItem){
      timeTableWithRatings.push({...item, rating: rat.Rating})
    }
  })
 })

 console.log(timeTableWithRatings)

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('FoodItem');

  const [filterMenuItem, setFilterMenuItem] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = timeTableWithRatings.map((n) => n.MenuItem);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByMenuItem = (event) => {
    setPage(0);
    setFilterMenuItem(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timeTableWithRatings.length) : 0;

  const filteredUsers = applySortFilter(timeTableWithRatings, getComparator(order, orderBy), filterMenuItem);

  const isNotFound = !filteredUsers.length && !!filterMenuItem;
  console.log(orderBy)

  const handleRatingChange = async(value, id)=>{
    console.log(value, id)

    setLoading(true)
    const res = await giveRatingToFoodItem(id, value)
    setLoading(false)
    console.log(res)
  }

  return (
    <>
      {user?.Role === "manager" && <Navigate to="/404" />}
      {user?.Role === "user" && <Navigate to="/404"/>}
    </>
  );
}
