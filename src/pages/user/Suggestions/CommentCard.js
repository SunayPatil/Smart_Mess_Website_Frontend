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

export default function CommentCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(props?.comments?.upvotes);
  const [downvotes, setDownvotes] = React.useState(props?.comments?.downvotes);
  const { setVote, disable, canDelete, deleteComment } = props;
  const commentid = props.comments._id;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const handleClick = async (isUpvote, commentId) => {
    const res = await voteSuggestion({ upvote: isUpvote, commentId });
    setUpvotes(res.data.upvotes);
    setDownvotes(res.data.downvotes);
    setVote(res.data);
  };
  const handleCardClick = () => {
    navigate(props?.comments?._id);
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
  console.log(props?.comments?.userId);
  return (
    <Card
      sx={{
        width: '95%',
      }}
      style={{ marginTop: '10px' }}
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
          // title={props?.suggestions?.suggestionTitle && props.suggestions.suggestionTitle}
          subheader={dayjs(props?.comments?.createdAt).format('DD/MMM/YYYY, ddd')}
          sx={{
            padding: '10px',
          }}
        />
        {canDelete && (
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              deleteComment(props?.comments?.id);
            }}
          >
            <Delete />
          </Button>
        )}
      </div>

      <CardContent>
        <Typography variant="body1" color="text.secondary" style={{ fontSize: '18px' }}>
          {props.comments.comment}
        </Typography>
      </CardContent>
      
      {/* {canDelete && props?.suggestions?.status == 'open' && (
        <Button
          style={{ margin: '10px' }}
          color="success"
          variant="outlined"
          onClick={() => markAsresolved(props.suggestions._id)}
        >
          Mark as Resolved
        </Button>
      )} */}
    </Card>
  );
}
