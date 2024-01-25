import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography} from '@mui/material';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsList from './Suggestions/UserActionList';

const Suggestions = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Suggestions
        </Typography>
        <Container
          sx={{
            display: 'flex',
            margin: '0',
            width: '100%',
          }}
          maxWidth="xl"
        >
          <Container
            sx={{
              flex: 5,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              maxHeight: '100vh',
              overflow: 'scroll',
            }}
            className="hideScrollBar"
          >
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </Container>
          <Container sx={{ flex: 2 }}>
            <UserActionsList />
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Suggestions;
