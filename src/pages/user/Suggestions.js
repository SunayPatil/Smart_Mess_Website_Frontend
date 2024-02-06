import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsList from './Suggestions/UserActionList';
import { getAllSuggestions } from './apis';
import CustomError from '../CustomErrorMessage';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchAllSuggestions = useCallback(async () => {
    const res = await getAllSuggestions();
    setSuggestions(res.data.suggestions);
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      fetchAllSuggestions();
    }
    return () => {
      mount = false;
    };
  }, [fetchAllSuggestions]);

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
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              maxHeight: '94vh',
              height: '94vh',
              overflow: 'scroll',
            }}
            className="hideScrollBar"
          >
            {suggestions &&
              suggestions.map((ele) => {
                return <SuggestionCard suggestions={ele} key={ele._id}/>;
              })}
            {!suggestions && <CustomError>No Suggestion</CustomError>}
          </Container>
          <Container
            sx={{ flex: 2, maxHeight: '94vh', height: '94vh', overflow: 'scroll' }}
            className="hideScrollBar"
          >
            <UserActionsList />
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Suggestions;
