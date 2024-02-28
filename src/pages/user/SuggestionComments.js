import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const SuggestionComments = () => {
  const location = useLocation();
  const { suggestion } = location.state || {};

  if (!suggestion) {
    return <Typography>No suggestion data available :</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4">{suggestion.title}</Typography>
      {/* Display other properties of the suggestion */}
      <Typography>{suggestion.description}</Typography>
      {/* Display children if available */}
      {suggestion.children && suggestion.children.length > 0 && (
        <div>
          <Typography variant="h6">Children:</Typography>
          {suggestion.children.map((child, index) => (
            <Typography key={index}>{child}</Typography> // Adjust based on what 'child' contains
          ))}
        </div>
      )}
    </Container>
  );
};

export default SuggestionComments;
