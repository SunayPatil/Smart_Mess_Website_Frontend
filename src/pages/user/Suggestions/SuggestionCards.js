import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import ArrowCircleDownSharpIcon from '@mui/icons-material/ArrowCircleDownSharp';
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
import Delete from '@mui/icons-material/Delete';
import { markAsresolved } from './apis';

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
  const { setVote, disable, canDelete, deleteSuggestion } = props;
  const suggestionid = props.key;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const handleClick = async (isUpvote, suggestionId) => {
    const res = await voteSuggestion({ upvote: isUpvote, suggestionId });
    setUpvotes(res.data.upvotes);
    setDownvotes(res.data.downvotes);
    setVote(res.data);
  };
  const handleCardClick = () => {
    navigate(props?.suggestions?._id);
  };
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Card
      sx={{
        width: '95%',
      }}
      style={{
  ...(props.iscomment && { marginTop: "10px" })
}}

    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${props?.suggestions?.userId?.Image}`} />
          }
          title={props?.suggestions?.suggestionTitle}
          subheader={dayjs(props?.suggestions?.createdAt).format('DD/MMM/YYYY, ddd')}
          sx={{
            padding: '10px',
          }}
        />
        {canDelete && (
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              deleteSuggestion(props?.suggestions?._id);
            }}
          >
            <Delete />
          </Button>
        )}
      </div>
      {!props.iscomment && props.suggestions?.image !== 'null' && (
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
        <Typography variant="body2" color="text.secondary" style={{fontSize:"18px"}}>
          {props?.suggestions?.suggestion?.substring(0, Math.min(100, props?.suggestions?.suggestion?.length))}
          {props?.comments?.comment}
          {props?.suggestions?.suggestion?.length > 100 && <>...</>}
        </Typography>
      </CardContent>
      {!canDelete && (
        <CardActions
          disableSpacing
          style={
            isDesktop
              ? { display: 'flex', justifyContent: 'space-between' }
              : { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '10px' }
          }
        >
          <div>
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
                <ArrowCircleUpSharpIcon />
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
                <ArrowCircleDownSharpIcon />
              </span>
              : {downvotes?.length}
            </Button>
          </div>
          {!props.discusson && (
            <Button variant="contained" color="primary" onClick={handleCardClick}>
              View Discussions
            </Button>
          )}

          {props?.suggestions?.suggestion?.length > 100 && (
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
      )}
      {canDelete && props?.suggestions?.status == 'open' && (
        <Button
          style={{ margin: '10px' }}
          color="success"
          variant="outlined"
          onClick={() => markAsresolved(props.suggestions._id)}
        >
          Mark as Resolved
        </Button>
      )}
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
