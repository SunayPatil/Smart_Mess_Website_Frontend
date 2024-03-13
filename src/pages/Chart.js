import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

function Chart() {
  const [chartData, setChartData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 6; // Adjust the number of data points you want to show at a time
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/userstats`;
        let data = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        data = await data.json();
        const formattedData = data.map(item => ({
          time: new Date(item.date).toLocaleDateString(),
          visitors: item.visitors,
        }));
        console.log(formattedData);
        setChartData(formattedData);
  
        // Calculate the starting index for the last page of data
        const lastIndex = formattedData.length - 1; // Last index in the data array
        const lastPageIndex = Math.max(0, lastIndex - (lastIndex % pageSize)); // Calculate the start index of the last page
  
        setCurrentIndex(lastPageIndex);
        setVisibleData(formattedData.slice(lastPageIndex, lastPageIndex + pageSize));
      } catch (error) {
        console.error('Failed to fetch visitor stats', error);
      }
    };
  
    fetchVisitorStats();
  }, []);
  

  const handleNext = () => {
    const nextIndex = currentIndex + pageSize;
    if (nextIndex < chartData.length) {
      setVisibleData(chartData.slice(nextIndex, nextIndex + pageSize));
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - pageSize;
    if (prevIndex >= 0) {
      setVisibleData(chartData.slice(prevIndex, prevIndex + pageSize));
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , gap:"20px" }}>
      <IconButton onClick={handleBack} disabled={currentIndex === 0}
       sx={{
    backgroundColor: 'primary.main', // Using theme's primary color
    color: 'white', // Setting the icon color to white for contrast
    '&:hover': {
      backgroundColor: 'primary.dark', // Darker shade on hover
    },
    '&.Mui-disabled': {
      backgroundColor: 'action.disabledBackground', // Disabled state background
      color: 'action.disabled', // Disabled state color
    }
  }} >
          <ArrowBackIosIcon  style={{paddingLeft:"5px"}}/>
        </IconButton>

        <Typography component="h2" variant="h6" color="primary" >
        Activity
      </Typography> 
        <IconButton onClick={handleNext} disabled={currentIndex + pageSize >= chartData.length}
          sx={{
    backgroundColor: 'primary.main', // Using theme's primary color
    color: 'white', // Setting the icon color to white for contrast
    '&:hover': {
      backgroundColor: 'primary.dark', // Darker shade on hover
    },
    '&.Mui-disabled': {
      backgroundColor: 'action.disabledBackground', // Disabled state background
      color: 'action.disabled', // Disabled state color
    }
  }}>
          <ArrowForwardIosIcon style={{paddingLeft:"3px"}} />
        </IconButton>

      </div>
      <div style={{ width: '100%', height: 300, overflow: 'hidden' }}>
        <ResponsiveContainer>
          <LineChart
            data={visibleData}
            margin={{
              top: 16,
              right: 20,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>

  );
}

export default Chart;
