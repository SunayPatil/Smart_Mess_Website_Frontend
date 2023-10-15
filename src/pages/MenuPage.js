import { Card, Container, Stack, Typography } from '@mui/material';
import { Table } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const MenuPage = () => {
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

  const daysArr = Object.keys(days);
  const temp = [];
  daysArr.forEach((item) => {
    temp.push({
      key: item,
      day: item,
      Breakfast: days[item].Breakfast.join(', '),
      Lunch: days[item].Lunch.join(', '),
      Snacks: days[item].Snacks.join(', '),
      Dinner: days[item].Dinner.join(', '),
    });
  });
  console.log(temp);
  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'key',
    },
    {
      title: 'Breakfast',
      dataIndex: 'Breakfast',
      key: 'key',
    },
    {
      title: 'Lunch',
      dataIndex: 'Lunch',
      key: 'key',
    },
    {
      title: 'Snacks',
      dataIndex: 'Snacks',
      key: 'key',
    },
    {
      title: 'Dinner',
      dataIndex: 'Dinner',
      key: 'key',
    },
  ];
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Menu
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>
        <Card>
          <Table scroll={{ x: 1000 }} bordered dataSource={temp} columns={columns} />
        </Card>
      </Container>
    </>
  );
};

export default MenuPage;