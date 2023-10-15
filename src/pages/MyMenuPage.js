import React from 'react'; 

import { Collapse } from 'antd';

import { Button, Container, Typography } from '@mui/material';

const date = new Date()
let today = date.getDay()
if (today===0) {
    today = 7;
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const MondayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'Lunch',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'Snacks',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'Dinner',
    children: <p>{text}</p>,
  },
];
const items = [
  {
    key: '1',
    label: 'Monday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={MondayNest} />,
  },
  {
    key: '2',
    label: 'Tuesday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },
  {
    key: '3',
    label: 'Wednesday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },
  {
    key: '4',
    label: 'Thursday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },
  {
    key: '5',
    label: 'Friday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },
  {
    key: '6',
    label: 'Saturday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },

  {
    key: '7',
    label: 'Sunday',
    children: <Collapse defaultActiveKey='1' items={MondayNest} />,
  },
];
const MyMenuPage = () => { 
  return( 
    <>
        <Typography variant="h3" sx={{ mb: 1 }}>
            Menu 
        </Typography> 
        <Collapse defaultActiveKey={today} size='large' items={items} />
    </>
  )
};
export default MyMenuPage;