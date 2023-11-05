import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { getDashTimeTable } from '../utils/apis';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const [ser, setSer] = useState('');
  const reqDate = new Date();
  console.log(reqDate.toLocaleTimeString());
  useEffect(() => { }, []);

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    // const minutes = currentTime.getMinutes();

    if (hours >= 7 && hours < 10) {
      setSer('Breakfast');
    } else if (hours >= 12 && hours < 15) {
      setSer('Lunch');
    } else if (hours >= 16 && hours < 18) {
      setSer('Snacks');
    } else if (hours >= 19 && hours < 21) {
      setSer('Dinner');
    } else {
      setSer('');
    }
  }

  useEffect(() => {
    getMealTime();
    const interval = setInterval(() => {
      getMealTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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

  const getTimeTableData = async () => {
    setLoading(true);
    const res = await getDashTimeTable();

    if (res?.length) {
      const temp = [];
      res?.forEach((item) => {
        if (item.Day === 'Monday') {
          setMondayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Tuesday') {
          setTuesdayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Wednesday') {
          setWednesdayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Thursday') {
          setThursdayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Friday') {
          setFridayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Saturday') {
          setSaturdayData((prvData) => {
            return [...prvData, item];
          });
        } else if (item.Day === 'Sunday') {
          setSundayData((prvData) => {
            return [...prvData, item];
          });
        }
      });
    }

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
  console.log(mondayData)
  const days = {
    Monday: {
      Breakfast: [
        'Poha',
        'Sev / Namkeen',
        'Boiled Sweet Corn',
        'Omelette',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Lemon Rice',
        'Plain Rice',
        'Moong Dal',
        'Rasam',
        'Torai Chana Dry',
        'Chole Masala',
        'Plain Roti / Fulka Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Vada Pav', 'Green Chutney & Dry Red Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Plain Rice',
        'Mix Dal',
        'Black Channa Masala Dry',
        'Aloo Rasewalla',
        'Poori',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Kheer',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Upma / Sheera',
        'Coconut Chutney',
        'Boiled Peanuts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Onion Fried Rice',
        'Plain Rice',
        'Arhar Dal',
        'Sambhar',
        'Moong Masala Dry',
        'Gobi Mutter Rasewalla',
        'Plain Roti / Butter Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Dahi Wada', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Corn Rice',
        'Plain Rice',
        'Moong Dal',
        'Paneer Kohlapuri',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Gulab Jamun',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Methi Paratha',
        'Veg Korma',
        'Channa Masala',
        'Egg Bhurji',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Curd Rice',
        'Plain Rice',
        'Masoor Dal',
        'Rasam',
        'Cabbage Capsicum Dry',
        'Manchurian Gravy',
        'Plain Roti / Butter Roti',
        'Lassi',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Veg Cutlet', 'Red Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Plain Rice',
        'Dal Tadka',
        'Kashmiri Dum Aloo',
        'Chawali Masala',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Ice Cream / Kulfi',
      ],
    },
    Thursday: {
      Breakfast: [
        'Idli Vada',
        'Sambar / Chutney',
        'Black Channa Sprouts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Lemon Rice',
        'Plain Rice',
        'Dal Palak',
        'Sambhar',
        'Bhindi Fry',
        'Soya Chunks Masala Dry',
        'Plain Roti / Butter Roti',
        'Curd',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Pav Bhaji', 'Chopped Onion & Lemon', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Plain Rice',
        'Jeera Rice',
        'Dal Tadka',
        'Paneer Chilli',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Moong Dal Halwa',
      ],
    },
    Friday: {
      Breakfast: [
        'Poori',
        'Chole',
        'Green Moong Sprouts',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Veg Biryani',
        'Egg Biryani',
        'Veg Raita',
        'Mix Veg Curry',
        'Plain Roti / Fulka Roti',
        'Rasna',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Veg Maggi', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Tomato Rice',
        'Plain Rice',
        'Mix Dal',
        'Mushroom Masala',
        'Rajma Masala',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Fruit Custard',
      ],
    },
    Saturday: {
      Breakfast: [
        'Masala Dosa',
        'Sambar / Chutney',
        'Matki Sprouts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Jeera Rice',
        'Dal Tadka',
        'Sambhar',
        'Gawar Masala Dry',
        'Aloo Mutter',
        'Plain Roti / Butter Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Samosa', 'Green Chilli & Red Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Onion Masala Rice',
        'Plain Rice',
        'Dal Panchratna',
        'Matki Masala Dry',
        'Veg Kadhai Gravy',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Ice Cream',
      ],
    },
    Sunday: {
      Breakfast: [
        'Aloo Paratha',
        'Curd',
        'Green Moong Sprouts',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Plain Rice',
        'Toor Dal',
        'Egg Curry',
        'Paneer Tawa Masala',
        'Plain Roti / Butter Roti',
        'Mango Rasna',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Pakoda', 'Green Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Veg Pulao',
        'Raita',
        'Green Chawli Subzi',
        'Mix Veg Curry',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Kala Jamun',
      ],
    },
  };
  const getCurrentDayMenu = () => {
    const currentDayIndex = new Date().getDay();
    const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      currentDayIndex
    ];
    return days[currentDayName];
  };

  const currentDayMenu = getCurrentDayMenu();
  console.log(currentDayMenu);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Today's Menu
        </Typography>

        {ser.length > 0 && (
          <Grid item lg={6} xs={12} sm={6} md={6}>
            <AppWidgetSummary
              key={ser}
              serving
              color="error"
              currentDayMenu={currentDayMenu[ser]}
              type={ser}
              title="Weekly Sales"
              total={714000}
              icon={'fluent:food-16-filled'}

            />
            <br />
          </Grid>
        )}

        <Grid container spacing={3}>
          <Grid item lg={6} xs={12} sm={6} md={6} >
            <AppWidgetSummary
              key="breakfast"
              currentDayMenu={currentDayMenu?.Breakfast}
              type="Breakfast"
              title="Weekly Sales"
              total={714000}
              icon={'fluent:food-16-filled'}
            />
          </Grid>

          <Grid item lg={6} xs={12} sm={6} md={6}>
            <AppWidgetSummary
              key="lunch"
              type="Lunch"
              currentDayMenu={currentDayMenu?.Lunch}
              title="New Users"
              total={1352831}
              color="success"
              icon={'fluent:food-16-filled'}
            />
          </Grid>

          <Grid item lg={6} xs={12} sm={6} md={6}>
            <AppWidgetSummary
              key="snacks"
              type="Snacks"
              currentDayMenu={currentDayMenu?.Snacks}
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={'fluent:food-16-filled'}
            />
          </Grid>

          <Grid item lg={6} xs={12} sm={6} md={6}>
            <AppWidgetSummary
              key="dinner"
              type="Dinner"
              currentDayMenu={currentDayMenu?.Dinner}
              title="Bug Reports"
              total={234}
              color="error"
              icon={'fluent:food-16-filled'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const menuTable = [{ Day: 'Monday', MealType: 'Breakfast', MealItems: ['Eggs', 'Bacon', 'Toast', 'Fruit', 'Milk'] }];