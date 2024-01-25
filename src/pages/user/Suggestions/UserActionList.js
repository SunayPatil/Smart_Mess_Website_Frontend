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

export default function UserActionsList() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

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
          }}
        >
          <SuggestionCard />
        </Paper>
      </Collapse>
    </List>
  );
}
