import React, { useCallback, useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { v4 as uuid } from 'uuid';
import { postSuggestionComment } from './apis';
import { toast } from 'react-toastify';
import { SocketContext } from 'src/Context/socket';

const CommentForm = ({ Id }) => {
  const [comment, setComment] = useState(''); // State for comment

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('suggestionId', Id);
    // formData.append('commentId', uuid());
    formData.append('comment', comment.comment);
    const res = await postSuggestionComment(formData);
    if (res.status === 200) {
      toast.success('Post Successful');
      setComment('');

      //   socket.emit('new-post');
    } else {
      toast.error('Some Error Occured');
    }
  };

  return (
    <form
      id="commentForm"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit}
    >
      <FormControl
        sx={{
          marginBottom: '30px',
        }}
      >
        <FormLabel>Comment</FormLabel>
        {/* Input field for comment */}
        <TextField
          fullWidth
          placeholder="Describe your comment ."
          required
          variant="outlined"
          multiline
          minRows="10"
          maxRows="15"
          value={comment?.comment}
          onChange={(e) => {
            setComment({ ...comment, comment: e.target.value });
          }}
        />
      </FormControl>

      {/* Submit button */}
      <Button
        type="submit"
        sx={{
          width: 'auto',
          margin: 'auto',
        }}
        variant="outlined"
      >
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
