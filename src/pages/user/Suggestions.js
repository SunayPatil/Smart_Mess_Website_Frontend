import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { Chip, Container, Typography, Button, Fab, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SocketContext } from '../../Context/socket';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsList from './Suggestions/UserActionList';
import { getAllSuggestions } from './apis';
import CustomError from '../CustomErrorMessage';
import Filter from './Suggestions/Filter';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dehaze from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';

// const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Suggestions = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('open'); // Default to showing open suggestions
  const [typeFilter, setTypeFilter] = useState('');
  const [isDrawarOpen, setIsDrawarOpen] = useState(false);
  const media = {
    isLaptop: useMediaQuery('(min-width:1023px)'),
    isTablet: useMediaQuery('(min-width:427px)') && useMediaQuery('(max-width:1022px)'),
    isMobile: useMediaQuery('(max-width:426px)'),
  };
  // console.log(media);
 const theme = useTheme();
  const socket = useContext(SocketContext);
  // Vote Logic
  const [vote, setVote] = useState(null);
  const [updates, setUpdates] = useState(false);

  const socket_ChangeVote = useCallback((vote) => {
    console.log(vote);
    setSuggestions(() => {
      return suggestions.map((ele) => {
        if (ele._id === vote._id) {
          return {
            ...ele,
            downvotes: vote.downvotes,
            upvotes: vote.upvotes,
          };
        }
        return ele;
      });
    });
    // console.log(suggestions);
  }, []);

  const socket_RemoveSuggestion = useCallback((deletedSuggestion) => {
    console.log({ deletedSuggestion });
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
  }, [vote, socket, socket_ChangeVote, socket_RemoveSuggestion, setUpdates]);

  const fetchAllSuggestions = useCallback(async () => {
    const res = await getAllSuggestions();
    // console.log({ fetchedSuggestions: res.data.suggestions });
    setSuggestions(res.data.suggestions.reverse());
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust based on your preference

  // Calculate the current suggestions to display based on pagination
  const indexOfLastSuggestion = currentPage * itemsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - itemsPerPage;
  const currentSuggestions = filteredSuggestions.slice(indexOfFirstSuggestion, indexOfLastSuggestion);

  // Change page handler
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to the top when changing page
  };

  // Calculate total pages for Pagination component
  const countPages = Math.ceil(filteredSuggestions.length / itemsPerPage);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', justifyContent: !media.isMobile ? 'flex-start' : 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Issues
          </Typography>
          {/*
        // TODO: Here is the filter component make the UI/UX more user friendly
        */}
          {/* <Filter typeFilter={typeFilter} setTypeFilter={setTypeFilter} /> */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
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
            padding: !media.isMobile ? '' : '0px',
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
                  position: 'fixed',
                  top: '20vh',
                  left: 'calc(100vw/2 - (137px/2))',
                  zIndex: '2000',
                  display: 'flex',
                  justifyContent: 'center',
                  opacity: '0.9',
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
            {currentSuggestions && currentSuggestions.map((ele) => {
                return <SuggestionCard suggestions={ele} key={ele._id} setVote={setVote} isMobile={media.isMobile} />;
              })}
            {(!currentSuggestions || currentSuggestions.length === 0) && <CustomError>No Suggestions</CustomError>}
          </Container>
        
          {media.isLaptop && (
            <Container
              sx={{ flex: 2, maxHeight: '94vh', height: '94vh', overflow: 'scroll' }}
              className="hideScrollBar"
            >
              <UserActionsList />
            </Container>
          )}
          {!media.isLaptop && (
            <>
              <Fab
                sx={{
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  height: '50px',
                  width: '50px',
                  zIndex: '2000',
                }}
                color="primary"
                onClick={() => {
                  setIsDrawarOpen(!isDrawarOpen);
                }}
              >
                {!isDrawarOpen ? <Dehaze /> : <CloseIcon />}
              </Fab>
              <Drawer
                open={isDrawarOpen}
                anchor="right"
                onClose={() => {
                  setIsDrawarOpen(!isDrawarOpen);
                }}
              >
                <div
                  style={{
                    width: '85vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <UserActionsList isMobile={media.isMobile} />
                </div>
              </Drawer>
            </>
          )}
        </Container>
        <div style={{display:"flex", justifyContent:"center"}}>
        {filteredSuggestions.length > itemsPerPage && (
   
      <Pagination 
        count={countPages} 
        page={currentPage} 
        style={{padding: '10px' , display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"20px" , width:"fit-content"}}
        onChange={handleChangePage} 
        color="primary" 
        showFirstButton 
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            color: theme.palette.primary.main, // Use theme colors for consistency
          },
          '& .Mui-selected': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
          },
          '& .MuiButtonBase-root:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
          },
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)', // Soft box shadow
          borderRadius: theme.shape.borderRadius, // Use theme border radius for consistency
        }} 
      />
   
  )}
  </div>
      </Container>
    </>
  );
};
export default Suggestions;
