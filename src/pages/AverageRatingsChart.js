import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const AverageRatingsChart = () => {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/average-ratings`;
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
        // Assuming the backend returns an array with one object containing all average ratings
        if (data && data.length > 0) {
          const averages = data[0];
          const formattedData = [
            { name: 'Breakfast', Rating: averages.AverageBreakfastRating },
            { name: 'Lunch', Rating: averages.AverageLunchRating },
            { name: 'Dinner', Rating: averages.AverageDinnerRating },
            { name: 'Snacks', Rating: averages.AverageSnacksRating },
            { name: 'Mess Service', Rating: averages.AverageMessServiceRating },
            { name: 'Hygiene', Rating: averages.AverageHygieneRating },
          ];
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch ratings:", error.message);
      }
    };

    fetchRatings();
  }, []);

  // Find min and max ratings for dynamic Y-axis scaling
  const ratings = chartData.map(item => item.Rating);
  const minY = Math.floor(Math.min(...ratings)) - 1;
  const maxY = Math.ceil(Math.max(...ratings)) + 1;

  return (
    <>
     <Typography component="h2" variant="h6" color="primary" >
        Ratings
      </Typography> 
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={chartData}
        margin={{
          top: 16,
              right: 20,
              left: -10,
              bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} domain={[minY, maxY]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Rating" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
};

export default AverageRatingsChart;
