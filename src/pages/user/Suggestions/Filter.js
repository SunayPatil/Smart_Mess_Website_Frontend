import { Container, InputLabel, MenuItem, Select, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Filter(props) {
  const { typeFilter, setTypeFilter } = props;
  useEffect(() => {
    let mount = true;
    if (mount) {
    }
    return () => {
      mount = false;
    };
  }, [typeFilter]);
  return (
    <Paper elevation={2} sx={{
        margin:"10px",
        width: '100%',
        padding:"5px"
    }}>
      <Typography variant="h6" paddingLeft={2}>Filters</Typography>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          gap: '30px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body">Suggestion Type: &nbsp;</Typography>
          <Select
            labelId="type"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
            }}
            sx={{
              minWidth: '30%',
            }}
          >
            <MenuItem value="improvement">Improvement</MenuItem>
            <MenuItem value="new-food-item">New Food Item</MenuItem>
            <MenuItem value="hygiene">Hygiene</MenuItem>
          </Select>
        </div>
      </Container>
    </Paper>
  );
}
