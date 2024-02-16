import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { SocketContext } from '../../Context/socket';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsList from './Suggestions/UserActionList';
import { getAllSuggestions } from './apis';
import CustomError from '../CustomErrorMessage';
import Filter from './Suggestions/Filter';

// const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const socket = useContext(SocketContext);
  // Vote Logic
  const [vote, setVote] = useState(null);

  const socket_RemoveSuggestion = React.useCallback((deletedSuggestion) => {
    // console.log({ deletedSuggestion });
    setSuggestions((suggestions) => {
      return suggestions.filter((ele) => {
        return ele._id != deletedSuggestion._id;
      });
    });
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount) {
      socket.on('vote-update', (vote) => {
        // console.log(vote);
        setSuggestions((suggestions) => {
          return suggestions.map((ele) => {
            if (ele._id === vote._id) {
              ele.downvotes = vote.downvotes;
              ele.upvotes = vote.upvotes;
              return ele;
            }
            return ele;
          });
        });
      });
      if (vote !== null) {
        socket.emit('vote-cast', vote);
        setVote(null);
      }
      socket.on('delete-suggestion', (deletedSuggestion) => {
        socket_RemoveSuggestion(deletedSuggestion);
      });
    }
    return () => {
      mount = false;
      // socket.off();
    };
  }, [vote, socket]);

  const fetchAllSuggestions = useCallback(async () => {
    const res = await getAllSuggestions();
    console.log(res.data.suggestions);
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

  // TODO:Add filter option for the manager

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Suggestions
        </Typography>
        {/*
        // TODO: Here is the filter component make the UI/UX more user friendly
        */}
        {/* <Filter typeFilter={typeFilter} setTypeFilter={setTypeFilter} /> */}
        <Container
          sx={{
            display: 'flex',
            margin: '0',
            width: '100%',
            // flexDirection: 'column',
          }}
          maxWidth="xl"
        >
          <Container
            sx={{
              flex: 4,
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
                return <SuggestionCard suggestions={ele} key={ele._id} setVote={setVote} />;
              })}
            {!suggestions && <CustomError>No Suggestion</CustomError>}
          </Container>
          <Container sx={{ flex: 2, maxHeight: '94vh', height: '94vh', overflow: 'scroll' }} className="hideScrollBar">
            <UserActionsList />
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Suggestions;
