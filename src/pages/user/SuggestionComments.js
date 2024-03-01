import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Chip, Container, Typography } from '@mui/material';
import { SocketContext } from '../../Context/socket';
import SuggestionCard from './Suggestions/SuggestionCards';
import './index.css';
import UserActionsListComment from './Suggestions/UserActionListComment';
import { getoneSuggestion } from './apis';
import CustomError from '../CustomErrorMessage';
import { Button ,Fab , Drawer } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dehaze from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import Filter from './Suggestions/Filter';
import { Autorenew, TourRounded } from '@mui/icons-material';
import CommentCard from './Suggestions/CommentCard';

// const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const SuggestionComment = () => {
  const navigate = useNavigate();
  const { suggestionId } = useParams();
  const [suggestionComment, setSuggestionComment] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const socket = useContext(SocketContext);
  // Vote Logic
  const [vote, setVote] = useState(null);
  const [updates, setUpdates] = useState(false);
  const isLaptop = useMediaQuery('(min-width:1023px)');
  const isMobile = useMediaQuery('(max-width:600px)');
  const socket_ChangeVote = useCallback((vote) => {
    // console.log(vote);
    setSuggestionComment((suggestions) => {
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
    setSuggestionComment((suggestions) => {
      return suggestions.filter((ele) => {
        return ele._id != deletedSuggestion._id;
      });
    });
  }, []);

  // useEffect(() => {
  //   let mount = true;
  //   if (mount) {
  //     socket.on('vote-update', (vote) => {
  //       socket_ChangeVote(vote);
  //     });
  //     if (vote !== null) {
  //       socket.emit('vote-cast', vote);
  //       setVote(null);
  //     }
  //     socket.on('delete-suggestion', (deletedSuggestion) => {
  //       socket_RemoveSuggestion(deletedSuggestion);
  //     });
  //     socket.on('new-post', () => {
  //       setUpdates(true);
  //     });
  //   }
  //   return () => {
  //     mount = false;
  //     // socket.off();
  //   };
  // }, [vote, socket]);

  const fetchSuggestion = useCallback(async () => {
    const res = await getoneSuggestion(suggestionId);
    setSuggestionComment(res.data.suggestion);
  }, []);

  // useEffect(() => {
  //   console.log(suggestionComment);
  // }, [suggestionComment]);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      fetchSuggestion();
    }
    return () => {
      mount = false;
    };
  }, [fetchSuggestion]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
        }}
      >
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
                    fetchSuggestion();
                    setUpdates(false);
                  }}
                  label={<Typography variant="h6">New Updates</Typography>}
                />
              </div>
            )}
            <SuggestionCard suggestions={suggestionComment} key={suggestionId} setVote={setVote} discusson={true} />
            {suggestionComment &&
              suggestionComment.children?.map((ele) => {
                // comment
                return <CommentCard comments={ele} key={ele._id} setVote={setVote} />;
              })}

            {(!suggestionComment || suggestionComment.length === 0) && <CustomError>No Suggestions</CustomError>}
          </Container>
          {isLaptop ? (
            <Container sx={{ flex: 2, maxHeight: '94vh', overflow: 'scroll' }} className="hideScrollBar">
              <UserActionsListComment Id={suggestionId} />
            </Container>
          ) : (
            <>
              <Fab
                sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '2000' }}
                color="primary"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                {isDrawerOpen ? <CloseIcon /> : <Dehaze />}
              </Fab>
              <Drawer open={isDrawerOpen} anchor="right">
                <UserActionsListComment Id={suggestionId} isMobile={isMobile} />
              </Drawer>
            </>
          )}
        </Container>
      </Container>
    </>
  );
};
export default SuggestionComment;
