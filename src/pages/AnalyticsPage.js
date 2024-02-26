import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import UsersRegistered from './UsersRegistered';

function AnalyticsPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      let user = await localStorage.getItem('user');
      user = await JSON.parse(user);
      setUser(user);
    };
    getUser();
  }, []);




  return (
    <>
     
      <Container maxWidth="lg" sx={{  mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
            Analytics
          </Typography>
            <Grid container spacing={3} style={{marginTop:"4px"}}>
     <Grid item xs={12} md={8} lg={9}>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Chart />
    </Paper>
  </Grid>
  <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <UsersRegistered activeUsers={9} />
                </Paper>
              </Grid>
              </Grid>
        </Container>
    </>
  );
}

export default AnalyticsPage;
