import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Using recharts for example
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

function Chart() {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/userstats`; // Ensure correct endpoint
        let data = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        data = await data.json();
        const formattedData = data.map(item => ({
          time: new Date(item.date).toLocaleDateString(), // Format date as needed
          visitors: item.visitors,
        }));
        console.log(formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error('Failed to fetch visitor stats', error);
      }
    };

    fetchVisitorStats();
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Activity
      </Typography>
      <div style={{ width: '100%', height: 300, flexGrow: 1, overflow: 'hidden' }}>
        <ResponsiveContainer>
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
