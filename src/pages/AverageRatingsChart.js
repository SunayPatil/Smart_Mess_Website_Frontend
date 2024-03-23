import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const AverageRatingsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 4; // Adjust based on your preference
  const theme = useTheme();

  // Define custom colors for the lines
  const colors = {
    breakfast: theme.palette.primary.main,
    lunch: theme.palette.secondary.main,
    dinner: '#FF5722', // deep orange
    snacks: '#4CAF50', // green
    messService: '#03A9F4', // light blue
    hygiene: '#9C27B0', // purple
  };

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/running-average-ratings`;
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setChartData(data);
        setVisibleData(data.slice(0, pageSize));
      } catch (error) {
        console.error("Failed to fetch ratings:", error.message);
      }
    };
  
    fetchRatings();
  }, []);

  const handleNext = () => {
    const nextIndex = currentIndex + pageSize;
    if (nextIndex < chartData.length) {
      setVisibleData(chartData.slice(nextIndex, Math.min(nextIndex + pageSize, chartData.length)));
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
        Running Average Ratings Over Time
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={visibleData}
          margin={{
            top: 16,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="RunningAverageBreakfastRating"
            stroke={colors.breakfast}
            name="Breakfast"
          />
          <Line
            type="monotone"
            dataKey="RunningAverageLunchRating"
            stroke={colors.lunch}
            name="Lunch"
          />
          <Line
            type="monotone"
            dataKey="RunningAverageDinnerRating"
            stroke={colors.dinner}
            name="Dinner"
          />
          <Line
            type="monotone"
            dataKey="RunningAverageSnacksRating"
            stroke={colors.snacks}
            name="Snacks"
          />
          <Line
            type="monotone"
            dataKey="RunningAverageMessServiceRating"
            stroke={colors.messService}
            name="Mess Service"
          />
          <Line
            type="monotone"
            dataKey="RunningAverageHygieneRating"
            stroke={colors.hygiene}
            name="Hygiene"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default AverageRatingsChart;
