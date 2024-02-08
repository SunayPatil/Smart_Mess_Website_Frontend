import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red, green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { voteSuggestion } from '../apis';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SuggestionCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(props?.suggestions?.upvotes);
  const [downvotes, setDownvotes] = React.useState(props?.suggestions?.downvotes);
  const setVote = props?.setVote;
  const disable = props?.disable;
  if (disable===true) {
    console.log(props?.suggestions);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = async (isUpvote, suggestionId) => {
    const res = await voteSuggestion({ upvote: isUpvote, suggestionId });
    setUpvotes(res.data.upvotes);
    setDownvotes(res.data.downvotes);
    setVote(res.data);
  };

  return (
    <Card
      sx={{
        width: '85%',
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${props?.suggestions?.userId?.Image}`} />}
        title={props?.suggestions?.suggestionTitle}
        subheader={dayjs(props?.suggestions?.createdAt).format('DD/MMM/YYYY, ddd')}
      />
      {props.suggestions?.image !== 'null' && (
        <CardMedia
          component="img"
          height="200px"
          src={props.suggestions?.image}
          alt="Paella dish"
          sx={{
            objectFit: 'contain',
            background: 'inherit',
          }}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props?.suggestions?.suggestion?.substring(0, Math.min(100, props?.suggestions?.suggestion?.length))}
          {props?.suggestions?.suggestion?.length > 100 && <>...</>}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          sx={{ color: green[700] }}
          disabled={disable}
          onClick={() => {
            handleClick(true, props?.suggestions?._id);
          }}
        >
          <span
            style={{
              fontSize: '30px',
            }}
          >
            &#128523;
          </span>
          : {upvotes?.length}
        </Button>

        <Button
          sx={{
            color: red[700],
          }}
          disabled={disable}
          onClick={() => {
            handleClick(false, props?.suggestions?._id);
          }}
        >
          <span
            style={{
              fontSize: '30px',
            }}
          >
            &#129314;
          </span>
          : {downvotes?.length}
        </Button>
        {props?.suggestions?.suggestion?.length > 100 && (
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      {props?.suggestions?.suggestion?.length > 100 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.suggestions?.suggestion}</Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
}
