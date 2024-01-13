import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Card, Collapse, Spin } from 'antd';

import { Container, Grid, Typography } from '@mui/material';

import { getDashTimeTable, getFoodItemRating } from '../utils/apis';

const { Meta } = Card;

const MyMenuPage = () => {
  const date = new Date();
  let today = date.getDay();
  if (today === 0) {
    today = 7;
  }

  const [timeTableData, setTimeTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mondayData, setMondayData] = useState([]);
  const [tuesdayData, setTuesdayData] = useState([]);
  const [wednesdayData, setWednesdayData] = useState([]);
  const [thursdayData, setThursdayData] = useState([]);
  const [fridayData, setFridayData] = useState([]);
  const [saturdayData, setSaturdayData] = useState([]);
  const [sundayData, setSundayData] = useState([]);
  const [defActiveKey, setDefActiveKey] = useState(0);
  const [itemRating, setItemRatings] = useState([]);

  const [ser, setSer] = useState('');

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    // const minutes = currentTime.getMinutes();

    if (hours >= 4 && hours < 10) {
      setSer('Breakfast');
      setDefActiveKey(1)
    } else if (hours >= 10 && hours < 15) {
      setSer('Lunch');
      setDefActiveKey(2)
    } else if (hours >= 15 && hours <= 19) {
      setSer('Snacks');
      setDefActiveKey(3)
    } else if (hours >= 19 && hours < 24) {
      setSer('Dinner');
      setDefActiveKey(4)
    } else {
      setSer('');
      setDefActiveKey([''])
    }
  }


  useEffect(() => {
    getMealTime();
    const interval = setInterval(() => {
      getMealTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const [allData, setAllData] = useState([])

  const navigate = useNavigate();
  const handleCardPress = () => {
    navigate("/dashboard/ratings")
  }

  const getTimeTableData = async () => {

    setLoading(true);
    const res = await getDashTimeTable();
    const ratings = await getFoodItemRating();
    if (res?.length) {
      setAllData(res)
    }
    console.log(ratings);
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
    const reqData = []
    allData.forEach((item) => {
      if (item.Day === currentDayName) {
        reqData.push(item)
      }
    })

    const reqData2 = {}
    reqData.forEach((item) => {
      if (item.Type === "Breakfast") {
        reqData2.Breakfast = item;
      } else if (item.Type === "Lunch") {
        reqData2.Lunch = item
      } else if (item.Type === "Snacks") {
        reqData2.Snacks = item
      } else if (item.Type === "Dinner") {
        reqData2.Dinner = item
      }
    })
    return reqData2
  };

  const currentDayMenu = getCurrentDayMenu();
  console.log(currentDayMenu)

  const items = [
    {
      key: '1',
      label: 'Breakfast',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Breakfast?.Items?.map((item, index) => {
              const rating = itemRating.filter((ele) => item?._id === ele.FoodItem)[0]?.Rating.toPrecision(2);
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Card
                    onClick={handleCardPress}
                    bordered
                    style={{
                      width: "100%",
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
                    {typeof rating !== "undefined" ? <Meta title={`${item?.Name}(${rating}/5)`} /> : <Meta title={item?.Name} />}

                  </Card>
                </Grid>
              )
            })}
        </Grid>
      ),
    },

    {
      key: '2',
      label: 'Lunch',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Lunch?.Items?.map((item, index) => {
              const rating = itemRating.filter((ele) => item?._id === ele.FoodItem)[0]?.Rating.toPrecision(2);
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Card
                    onClick={handleCardPress}
                    bordered
                    style={{
                      width: "100%",
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
                    {typeof rating !== "undefined" ? <Meta title={`${item?.Name}(${rating}/5)`} /> : <Meta title={item?.Name} />}
                  </Card>
                </Grid>
              )
            })}
        </Grid>
      ),
    },
    {
      key: '3',
      label: 'Snacks',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Snacks?.Items?.map((item, index) => {
              const rating = itemRating.filter((ele) => item?._id === ele.FoodItem)[0]?.Rating.toPrecision(2);
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Card
                    onClick={handleCardPress}
                    bordered
                    style={{
                      width: "100%",
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
                    {typeof rating !== "undefined" ? <Meta title={`${item?.Name}(${rating}/5)`} /> : <Meta title={item?.Name} />}

                  </Card>
                </Grid>
              )
            })}
        </Grid>
      ),
    },
    {
      key: '4',
      label: 'Dinner',
      children: (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {currentDayMenu
            ?.Dinner?.Items?.map((item, index) => {
              const rating = itemRating.filter((ele) => item?._id === ele.FoodItem)[0]?.Rating.toPrecision(2);
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Card
                    onClick={handleCardPress}
                    bordered
                    style={{
                      width: "100%",
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
                    {typeof rating !== "undefined" ? <Meta title={`${item?.Name}(${rating}/5)`} /> : <Meta title={item?.Name} />}
                  </Card>
                </Grid>
              )
            })}
        </Grid>
      ),
    },
  ];
  console.log(defActiveKey);

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
