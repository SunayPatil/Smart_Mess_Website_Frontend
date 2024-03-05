import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Card, Collapse, Spin } from 'antd';

import { Container, Grid, Typography, Rating } from '@mui/material';

import { getDashTimeTable, getFoodItemRating } from '../utils/apis';
import { find } from 'lodash';

const { Meta } = Card;

const MyMenuPage = () => {
  const date = new Date();
  let today = date.getDay();
  if (today === 0) {
    today = 7;
  }

  const [timeTableData, setTimeTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defActiveKey, setDefActiveKey] = useState(0);
  const [itemRating, setItemRatings] = useState([]);

  const [ser, setSer] = useState('');

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 4 && hours < 10) {
      setSer('Breakfast');
      setDefActiveKey(1);
    } else if (hours >= 10 && hours < 15) {
      setSer('Lunch');
      setDefActiveKey(2);
    } else if (hours >= 15 && hours <= 19) {
      setSer('Snacks');
      setDefActiveKey(3);
    } else if (hours >= 19 && hours < 24) {
      setSer('Dinner');
      setDefActiveKey(4);
    } else {
      setSer('');
      setDefActiveKey(['']);
    }
  }

  useEffect(() => {
    getMealTime();
    const interval = setInterval(() => {
      getMealTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const [allData, setAllData] = useState([]);

  const navigate = useNavigate();
  const handleCardPress = (value) => {
    const role = JSON.parse(localStorage.getItem('user'))?.Role;
    if (value && role === 'user') {
      const urlEncode = encodeURI(`/dashboard/ratings?hidden=true&value=${value}`);
      navigate(urlEncode);
    } else if (role === 'user') {
      navigate('/dashboard/ratings');
    }
  };

  const getTimeTableData = async () => {
    setLoading(true);
    const res = await getDashTimeTable();
    const ratings = await getFoodItemRating();
    if (res?.length) {
      setAllData(res);
    }
    // console.log(ratings);
    setItemRatings(ratings);
    setTimeTableData(res);
    setLoading(false);
  };
  useEffect(() => {
    try {
      getTimeTableData();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const getCurrentDayMenu = () => {
    const currentDayIndex = new Date().getDay();
    const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      currentDayIndex
    ];
    const reqData = [];
    allData.forEach((item) => {
      if (item.Day === currentDayName) {
        reqData.push(item);
      }
    });

    const reqData2 = {};
    reqData.forEach((item) => {
      if (item.Type === 'Breakfast') {
        reqData2.Breakfast = item;
      } else if (item.Type === 'Lunch') {
        reqData2.Lunch = item;
      } else if (item.Type === 'Snacks') {
        reqData2.Snacks = item;
      } else if (item.Type === 'Dinner') {
        reqData2.Dinner = item;
      }
    });
    return reqData2;
  };

  const currentDayMenu = getCurrentDayMenu();
  // console.log(currentDayMenu)

  const items = [
    {
      key: '1',
      label: 'Breakfast(07:30AM - 09:00AM)',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu?.Breakfast?.Items?.map((item, index) => {
            const currItemRatingStats = find(itemRating, { FoodItem: item?._id });
            const numberOfReviews = currItemRatingStats?.NumberOfReviews;
            const rating = currItemRatingStats?.Rating.toPrecision(2);
            return (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  onClick={() => {
                    handleCardPress(item?.Name);
                  }}
                  bordered
                  style={{
                    width: '100%',
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'cover' }}
                      alt="example"
                      src={item?.Image}
                      loading="lazy"
                    />
                  }
                >
                  {typeof rating !== 'undefined' ? (
                    <>
                      <Meta title={`${item?.Name}`} />
                      <div
                        style={{
                          display: 'flex',
                          gap: '3px',
                          fontSize: '12px',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Rating name="read-only" value={rating} readOnly precision={0.1} />
                        <span>{numberOfReviews}</span>
                      </div>
                    </>
                  ) : (
                    <Meta title={item?.Name} />
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ),
    },

    {
      key: '2',
      label: 'Lunch(12:30PM - 02:00PM)',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu?.Lunch?.Items?.map((item, index) => {
            const currItemRatingStats = find(itemRating, { FoodItem: item?._id });
            const numberOfReviews = currItemRatingStats?.NumberOfReviews;
            const rating = currItemRatingStats?.Rating.toPrecision(2);
            return (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  onClick={() => {
                    handleCardPress(item?.Name);
                  }}
                  bordered
                  style={{
                    width: '100%',
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'cover' }}
                      alt="example"
                      src={item?.Image}
                      loading="lazy"
                    />
                  }
                >
                  {typeof rating !== 'undefined' ? (
                    <>
                      <Meta title={`${item?.Name}`} />
                      <div
                        style={{
                          display: 'flex',
                          gap: '3px',
                          fontSize: '12px',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Rating name="read-only" value={rating} readOnly precision={0.1} />
                        <span>{numberOfReviews}</span>
                      </div>
                    </>
                  ) : (
                    <Meta title={item?.Name} />
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ),
    },
    {
      key: '3',
      label: 'Snacks(04:30PM - 06:00PM)',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu?.Snacks?.Items?.map((item, index) => {
            const currItemRatingStats = find(itemRating, { FoodItem: item?._id });
            const numberOfReviews = currItemRatingStats?.NumberOfReviews;
            const rating = currItemRatingStats?.Rating.toPrecision(2);
            return (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  onClick={() => {
                    handleCardPress(item?.Name);
                  }}
                  bordered
                  style={{
                    width: '100%',
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'cover' }}
                      alt="example"
                      src={item?.Image}
                      loading="lazy"
                    />
                  }
                >
                  {typeof rating !== 'undefined' ? (
                    <>
                      <Meta title={`${item?.Name}`} />
                      <div
                        style={{
                          display: 'flex',
                          gap: '3px',
                          fontSize: '12px',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Rating name="read-only" value={rating} readOnly precision={0.1} />
                        <span>{numberOfReviews}</span>
                      </div>
                    </>
                  ) : (
                    <Meta title={item?.Name} />
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ),
    },
    {
      key: '4',
      label: 'Dinner(07:30PM - 09:00PM)',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu?.Dinner?.Items?.map((item, index) => {
            const currItemRatingStats = find(itemRating, { FoodItem: item?._id });
            const numberOfReviews = currItemRatingStats?.NumberOfReviews;
            const rating = currItemRatingStats?.Rating.toPrecision(2);
            return (
              <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                <Card
                  onClick={() => {
                    handleCardPress(item?.Name);
                  }}
                  bordered
                  style={{
                    width: '100%',
                  }}
                  cover={
                    <img
                      style={{ height: '160px', objectFit: 'cover' }}
                      alt="example"
                      src={item.Image}
                      loading="lazy"
                    />
                  }
                >
                  {typeof rating !== 'undefined' ? (
                    <>
                      <Meta title={`${item?.Name}`} />
                      <div
                        style={{
                          display: 'flex',
                          gap: '3px',
                          fontSize: '12px',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Rating name="read-only" value={rating} readOnly precision={0.1} />
                        <span>{numberOfReviews}</span>
                      </div>
                    </>
                  ) : (
                    <Meta title={item?.Name} />
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ),
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Today's Menu
        </Typography>
        <Spin spinning={loading} size="medium">
          {defActiveKey && <Collapse defaultActiveKey={defActiveKey} size="large" items={items} />}
        </Spin>
      </Container>
    </>
  );
};
export default MyMenuPage;
