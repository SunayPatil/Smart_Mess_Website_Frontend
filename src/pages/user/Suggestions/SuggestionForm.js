import React, { useCallback, useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuid } from 'uuid';
import { postUserSuggestion } from './apis';
import { toast } from 'react-toastify';
import { SocketContext } from 'src/Context/socket';
import imageCompression from 'browser-image-compression';
import '../index.css';

const SuggestionForm = () => {
  const [suggestion, setSuggestion] = useState({
    title: '',
    suggestion: '',
    image: null,
    suggestionType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const socket = useContext(SocketContext);

  const imageCompressOpts = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('suggestionType', suggestion.suggestionType);
    formData.append('suggestionTitle', suggestion.title);
    formData.append('suggestion', suggestion.suggestion);
    formData.append('suggestionId', uuid());
    if (suggestion.image) {
      try {
        const compressedFile = await imageCompression(suggestion.image, imageCompressOpts);
        formData.append('image', compressedFile);
      } catch (err) {
        const mute = err;
        console.log(mute);
        setSuggestion((suggestion) => ({
          ...suggestion,
          title: '',
          suggestion: '',
          image: null,
          suggestionType: '',
        }));
        setIsSubmitting(false);
        toast.error('Error in image compression.');
        return;
      }
    }
    const res = await postUserSuggestion(formData);
    if (res.status === 200) {
      toast.success('Post Successful');
      setSuggestion((suggestion) => ({
        ...suggestion,
        title: '',
        suggestion: '',
        image: null,
        suggestionType: '',
      }));
      document.getElementById('image').value = null;
      socket.emit('new-post');
    } else {
      console.log(res);
      toast.error('Some Error Occured');
    }
    setIsSubmitting(false);
  };

  return (
    <form
      id="suggestionForm"
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
        <InputLabel id="suggestion-type-label">Suggestion Type</InputLabel>
        <Select
          labelId="suggestion-type-label"
          id="suggestion-type-selector"
          value={suggestion.suggestionType}
          label="Suggestion Type"
          onChange={(e) => {
            setSuggestion({ ...suggestion, suggestionType: e.target.value });
          }}
          required
        >
          <MenuItem value="improvement">Improvement</MenuItem>
          <MenuItem value="new-food-item">New Food Item</MenuItem>
          <MenuItem value="hygiene">Hygiene</MenuItem>
          <MenuItem value="contamination">Contamination</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          marginBottom: '30px',
        }}
      >
        <FormLabel>Title</FormLabel>
        <TextField
          fullWidth
          placeholder="Title"
          required
          variant="outlined"
          value={suggestion?.title}
          onChange={(e) => {
            setSuggestion({ ...suggestion, title: e.target.value });
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          marginBottom: '30px',
        }}
      >
        <FormLabel>Suggestion</FormLabel>
        <TextField
          fullWidth
          placeholder="Describe your suggestion in no more than 500 words."
          required
          variant="outlined"
          multiline
          minRows="10"
          maxRows="15"
          value={suggestion?.suggestion}
          onChange={(e) => {
            setSuggestion({ ...suggestion, suggestion: e.target.value });
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          marginBottom: '30px',
        }}
      >
        <FormLabel>Attach Image</FormLabel>
        <Input
          id="image"
          aria-describedby="image"
          type="file"
          accept="image/png"
          onChange={(e) => {
            setSuggestion({ ...suggestion, image: e.target.files[0] });
          }}
        />
      </FormControl>
      <Button
        type="submit"
        sx={{
          width: 'auto',
          margin: 'auto',
        }}
        variant="outlined"
        disabled={isSubmitting}
      >
        {isSubmitting ? <div className="loader-submit" /> : 'Submit'}
      </Button>
    </form>
  );
};

export default SuggestionForm;
