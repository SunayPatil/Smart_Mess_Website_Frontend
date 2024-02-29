import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { Chip, Container, Typography } from '@mui/material';
import { SocketContext } from '../../Context/socket';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsList from './Suggestions/UserActionList';
import { getAllSuggestions } from './apis';
import CustomError from '../CustomErrorMessage';
import { Button } from '@mui/material';
import Filter from './Suggestions/Filter';
import { Autorenew, TourRounded } from '@mui/icons-material';

// const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Suggestions = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('open'); // Default to showing open suggestions
  const [typeFilter, setTypeFilter] = useState('');
  const socket = useContext(SocketContext);
  // Vote Logic
  const [vote, setVote] = useState(null);
  const [updates, setUpdates] = useState(false);

  const socket_ChangeVote = useCallback((vote) => {
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
  }, []);

  const socket_RemoveSuggestion = useCallback((deletedSuggestion) => {
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
        socket_ChangeVote(vote);
      });
      if (vote !== null) {
        socket.emit('vote-cast', vote);
        setVote(null);
      }
      socket.on('delete-suggestion', (deletedSuggestion) => {
        socket_RemoveSuggestion(deletedSuggestion);
      });
      socket.on('new-post', () => {
        setUpdates(true);
      });
    }
    return () => {
      mount = false;
      // socket.off();
    };
  }, [vote, socket]);

  const fetchAllSuggestions = useCallback(async () => {
    const res = await getAllSuggestions();
    console.log({ fetchedSuggestions: res.data.suggestions });
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
  useEffect(() => {
    // Whenever suggestions or statusFilter changes, filter suggestions
    filterSuggestions(suggestions, statusFilter);
  }, [suggestions, statusFilter]);

  const filterSuggestions = (suggestions, status) => {
    const filtered = suggestions.filter((suggestion) => suggestion.status === status);
    setFilteredSuggestions(filtered);
  };
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Issues
          </Typography>
          {/*
        // TODO: Here is the filter component make the UI/UX more user friendly
        */}
          {/* <Filter typeFilter={typeFilter} setTypeFilter={setTypeFilter} /> */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginBottom: '20px' }}>
            <Button
              variant={statusFilter === 'open' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setStatusFilter('open')}
            >
              Open
            </Button>
            <Button
              variant={statusFilter === 'closed' ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setStatusFilter('closed')}
            >
              Closed
            </Button>
          </div>
        </div>
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
              position: 'relative',
            }}
            className="hideScrollBar"
          >
            {updates && (
              <div
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '2%',
                  zIndex: '10',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Chip
                  sx={{
                    position: 'relative',
                    margin: 'auto',
                    height: 'auto',
                    padding: '3px',
                  }}
                  variant="filled"
                  component="button"
                  color="primary"
                  onClick={() => {
                    fetchAllSuggestions();
                    setUpdates(false);
                  }}
                  label={<Typography variant="h6">New Updates</Typography>}
                />
              </div>
            )}
            {filteredSuggestions &&
              filteredSuggestions.map((ele) => {
                return <SuggestionCard suggestions={ele} key={ele._id} setVote={setVote} />;
              })}
            {(!filteredSuggestions || filteredSuggestions.length === 0) && <CustomError>No Suggestions</CustomError>}
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
