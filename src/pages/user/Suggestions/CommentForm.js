import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { postSuggestionComment } from './apis';

const CommentForm = ({ Id }) => {
  const [comment, setComment] = useState(''); // State for comment as a simple string

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('suggestionId', Id);
    formData.append('comment', comment); // Directly use comment as it's a string
    const res = await postSuggestionComment(formData);
    if (res.status === 200 || res.status === 204) {
      toast.success('Post Successful');
      setComment(''); // Clear the comment state
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
          placeholder="Describe your comment."
          required
          variant="outlined"
          multiline
          minRows={10}
          maxRows={15}
          value={comment} // Use comment directly
          onChange={(e) => setComment(e.target.value)}
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
