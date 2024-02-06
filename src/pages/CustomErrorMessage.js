// @mui
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  maxHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function CustomError(props) {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {props.children}
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
}
