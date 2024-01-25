import React, { useState } from 'react';
import { FormControl, InputLabel, Input, TextField, FormLabel, Button, Select, MenuItem } from '@mui/material';
import { Paper } from '@material-ui/core';

const SuggestionForm = () => {
  const [suggestion, setSuggestion] = useState({
    title: '',
    suggestion: '',
    image: null,
    suggestionType: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(suggestion);
  };

  return (
      <form
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
        >
          Submit
        </Button>
      </form>
  );
};

export default SuggestionForm;
