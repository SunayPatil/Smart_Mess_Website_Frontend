import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SuggestionForm from './SuggestionForm';
import SuggestionCard from './SuggestionCards';
import { deleteUserSuggestion, getUserSuggestion } from './apis';
import { SocketContext } from '../../../Context/socket';

export default function UserActionsList() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const socket = React.useContext(SocketContext);

  const deleteSuggestion = async (suggestionId) => {
    const res = await deleteUserSuggestion({ suggestionId });
    setSuggestions((suggestions) => {
      return suggestions.filter((ele) => {
        return ele._id != suggestionId;
      });
    });
    socket.emit('delete-suggestion', res.data.deletedSuggestion);
  };
  const fetchUserSuggestions = React.useCallback(async () => {
    const res = await getUserSuggestion();
    setSuggestions(res.data.suggestions);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchUserSuggestions();
    }
    return () => {
      mounted = false;
    };
  }, [fetchUserSuggestions]);

  
  const socket_ChangeVote = React.useCallback((vote) => {
    setSuggestions((suggestions) => {
      if(!suggestions){
        return null;
      }
      return suggestions.map((ele) => {
        if (ele._id === vote._id) {
          ele.downvotes = vote.downvotes;
          ele.upvotes = vote.upvotes;
          // console.log(ele);
          return ele;
        }
        // console.log(ele);
        return ele;
      });
    });
  }, []);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      socket.on('vote-update', (vote) => {
        socket_ChangeVote(vote);
      });
    }
    return () => {
      mount = false;
      // socket.off();
    };
  }, [socket]);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        onClick={() => {
          setOpenAdd(!openAdd);
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
          }}
        >
          <InboxIcon color={openAdd ? 'primary' : ''} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="h5"
              sx={{ mb: 3, marginTop: 'auto', marginBottom: 'auto' }}
              color={openAdd ? 'primary' : ''}
            >
              Add New Suggestion
            </Typography>
          }
        />
        {openAdd ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAdd} timeout="auto" unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
          }}
        >
          <SuggestionForm />
        </Paper>
      </Collapse>
      <Divider />
      <ListItemButton
        onClick={() => {
          setOpenView(!openView);
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
          }}
        >
          <InboxIcon color={openView ? 'primary' : ''} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="h5"
              sx={{ mb: 3, marginTop: 'auto', marginBottom: 'auto' }}
              color={openView ? 'primary' : ''}
            >
              Your Suggestions
            </Typography>
          }
        />
        {openView ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openView} timeout="auto" unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {suggestions &&
            suggestions.map((ele) => {
              return (
                <SuggestionCard suggestions={ele} disable key={ele._id} canDelete deleteSuggestion={deleteSuggestion} />
              );
            })}
        </Paper>
      </Collapse>
    </List>
  );
}
