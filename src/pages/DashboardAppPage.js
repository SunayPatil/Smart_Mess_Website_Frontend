import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Hidden } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [ser, setSer] = useState('');
  const reqDate = new Date();
  console.log(reqDate.toLocaleTimeString());
  useEffect(() => {}, []);

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

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

  console.log(`It's currently ${ser} time.`);

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

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

const menuTable = [{ Day: 'Monday', MealType: 'Breakfast', MealItems: ['Eggs', 'Bacon', 'Toast', 'Fruit', 'Milk'] }];