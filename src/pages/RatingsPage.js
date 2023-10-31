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
import { Rate, Spin, Input } from 'antd';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getDashTimeTable, giveRatingToFoodItem , getFoodItemRating, getFoodReviews, submitFoodReview} from '../utils/apis';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'foodItem', label: 'FoodItem', alignRight: false },
  { _id: 'rate', label: 'Rate', alignRight: false },
  { _id: 'comment', label: 'Comments', alignRight: false },
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
  const [ratedFoodItems,setRatedFoodItems] = useState([]);
  const [foodComment,setFoodComment] = useState("");
  const [loading, setLoading] = useState(false)
  const [currentlyRating, setCurrentlyRating] = useState(null);
  console.log(todaysItemsRatings)


  const getRatedFoodItemVals = async () => {
    const res = await getFoodReviews();
    setRatedFoodItems(res);
  }

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
      getRatedFoodItemVals()
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

  const filterItem = applySortFilter(timeTableWithRatings, getComparator(order, orderBy), filterMenuItem);

  const isNotFound = !filterItem.length && !!filterMenuItem;
  console.log(orderBy)

  const handleRatingChange = async(value, id)=>{
    if(currentlyRating===null){
      setCurrentlyRating({
        id,
        value,
        comments:""
      });
    }else if(currentlyRating.id!==id){
        setCurrentlyRating({
          id,
          value,
          comments:""
        });
    }else{
        setCurrentlyRating((currentlyRating)=>{
          return {
            id: currentlyRating.id,
            value,
            comments: currentlyRating.comments
          }
        });
      }
    }

  const handleSubmitFoodReview = async ()=>{
    if(currentlyRating.id){
      setLoading(true)
      await giveRatingToFoodItem(currentlyRating.id,currentlyRating.value);
      await submitFoodReview(currentlyRating)
      await getRatedFoodItemVals()
      await getAllRatingsData() 
      setLoading(false)
    }
  };

  return (
    <>
      {user?.Role === "manager" && <Navigate to="/404" />}
      {user?.Role === "user" && 

            <>
            <Helmet>
              <title> User | Minimal UI </title>
            </Helmet>
      
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Ratings
                </Typography>
                {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New User
                </Button> */}
              </Stack>
      
              <Card>
                {/* <UserListToolbar numSelected={selected.length} filterMenuItem={filterMenuItem} onFilterMenuItem={handleFilterByMenuItem} /> */}
      
                <Scrollbar>
                <Spin spinning={loading} size='medium'>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={todaysItems.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
      
                     <TableBody>
                        {filterItem.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, Name, Image,rating } = row;
                          const selectedUser = selected.indexOf(MenuItem) !== -1;
      
                          return (
                            <TableRow hover key={_id} tabIndex={-1} MealTime="checkbox" selected={selectedUser}>
                              <TableCell padding="checkbox">
                                {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, MenuItem)} /> */}
                              </TableCell>
      
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={MenuItem} src={Image} />
                                  <Typography variant="subtitle2" noWrap>
                                    {Name}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              
                              <TableCell align="left">
                                {
                                  ratedFoodItems.filter(e => e.foodId === _id ).length>0
                                  ? <Rate value={ratedFoodItems.filter(e => e.foodId === _id )[0].rating} disabled/>
                                  :<Rate onChange={(value)=> handleRatingChange(value, _id)} /> 
                                }
                                </TableCell>

                                <TableCell align="left">
                                {
                                  ratedFoodItems.filter(e => e.foodId === _id ).length>0
                                  ? <Input value={ratedFoodItems.filter(e => e.foodId === _id )[0].comments} disabled/>
                                  :<div><Input onChange={(e)=>{setCurrentlyRating({id:currentlyRating.id,value:currentlyRating.value,comments:e.target.value})}} /><Button onClick={handleSubmitFoodReview}>Submit</Button></div>
                                }
                                </TableCell>
      
                              <TableCell align='left' component="th" scope="row" padding="none">
                                {rating?.toFixed(2)}/5.00
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
      
      
                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>
      
                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterMenuItem}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                  </Spin>
                </Scrollbar>
      
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={todaysItems.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Container>
      
            {/* <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                },
              }}
            >
            </Popover> */}
            </>
      }
    </>
  );
}
