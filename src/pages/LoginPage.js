import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
// @mui
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import clientId from '../constants/client-id';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const onSuccess = (res) => {
    navigate('/dashboard', { replace: true });
    console.log('login success ', res.profileObj);
  };
  const onFailure = (res) => {
    console.log('login failed ', res);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: { clientId },
        scope: '',
      });
    }
    gapi.load('client', start);
  }, []);

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            <Stack direction="row" spacing={2}>
              <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                render={(renderProps) => (
                  <Button onClick={renderProps.onClick} fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                  </Button>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn
              />

              {/* <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button> */}
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
