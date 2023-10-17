import React,{useEffect,useState} from 'react'; 

import { Card, Col, Collapse, Divider, Row, Spin } from 'antd';

import { Button, Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

import { getDashTimeTable } from '../utils/apis';

const { Meta } = Card;



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const weekday=new Array(7);
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
weekday[0]="Sunday";



const MyMenuPage = () => { 

  const date = new Date()
let today = date.getDay()
if (today===0) {
    today = 7;
}

  const [timeTableData, setTimeTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [mondayData, setMondayData] = useState([])
  const [tuesdayData, setTuesdayData] = useState([])
  const [wednesdayData, setWednesdayData] = useState([])
  const [thursdayData, setThursdayData] = useState([])
  const [fridayData, setFridayData] = useState([])
  const [saturdayData, setSaturdayData] = useState([])
  const [sundayData, setSundayData] = useState([])

  const [timesData, setTimesData] = useState([])
  console.log(mondayData)
  const breakfastArr = mondayData.filter((day)=>{return day.Type==="Breakfast"})
  console.log(breakfastArr.Items)

const getTimeTableData = async ()=>{
  setLoading(true)
  const res = await getDashTimeTable()

  if(res?.length){
    const temp = []
    res?.forEach((item)=>{
      if(item.Day === "Monday"){
        setMondayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Tuesday"){
        setTuesdayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Wednesday"){
        setWednesdayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Thursday"){
        setThursdayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Friday"){
        setFridayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Saturday"){
        setSaturdayData((prvData)=>{
          return [...prvData, item]
        })
      }
      else if(item.Day === "Sunday"){
        setSundayData((prvData)=>{
          return [...prvData, item]
        })
      }
    })
  }
  
  setTimeTableData(res)
  setLoading(false)

}
useEffect(()=>{
  try {
    getTimeTableData()
  } catch (error) {
    setLoading(false)
  }
}, [])

const style = {
  background: '#0092ff',
  padding: '8px 0',
};

const MondayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {mondayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {mondayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {mondayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {mondayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const TuesdayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {tuesdayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {tuesdayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {tuesdayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {tuesdayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const WednesdayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {wednesdayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {wednesdayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {wednesdayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {wednesdayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const ThursdayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {thursdayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {thursdayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {thursdayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {thursdayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const FridayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {fridayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {fridayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {fridayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {fridayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const SaturdayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {saturdayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {saturdayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {saturdayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {saturdayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
];

const SundayNest = [
  {
    key: '1',
    label: 'Breakfast',
    children:
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {sundayData.filter((day)=>{return day.Type==="Breakfast"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '2',
    label: 'Lunch',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {sundayData.filter((day)=>{return day.Type==="Lunch"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '3',
    label: 'Snacks',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {sundayData.filter((day)=>{return day.Type==="Snacks"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
  },
  {
    key: '4',
    label: 'Dinner',
    children: 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {sundayData.filter((day)=>{return day.Type==="Dinner"})[0]?.Items?.map((item, index) => (
        <Grid  item xs={4} sm={4} md={4} lg={4}  key={index}>
          <Card
            bordered
            style={{
              width: 240,
            }}
            cover={<img style={{height: "160px", objectFit: "contain"}}  alt="example" src={item.Image} />}
          >
          <Meta title={item.Name}  />
          </Card>
        </Grid>
      ))}
    </Grid>
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
    children: <Collapse defaultActiveKey='1' size='large' accordion items={TuesdayNest} />,
  },
  {
    key: '3',
    label: 'Wednesday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={WednesdayNest} />,
  },
  {
    key: '4',
    label: 'Thursday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={ThursdayNest} />,
  },
  {
    key: '5',
    label: 'Friday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={FridayNest} />,
  },
  {
    key: '6',
    label: 'Saturday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={SaturdayNest}/>,
  },

  {
    key: '7',
    label: 'Sunday',
    children: <Collapse defaultActiveKey='1' size='large' accordion items={SundayNest} />,
  },
];
  return( 
    <>
        <Typography variant="h3" sx={{ mb: 1 }}>
            Menu 
        </Typography> 
        <Spin spinning={loading} size='medium'>
        <Collapse defaultActiveKey={today} size='large' items={items} />
        </Spin>
    </>
  )
};
export default MyMenuPage;