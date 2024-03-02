import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gapi } from 'gapi-script';
import {  useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import { Spin } from 'antd';
// @mui
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import clientId from '../constants/client-id';
import { Signin, handleNotification } from '../utils/apis';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 780,
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  const googleSuccess = async (res) => {
    setLoading(true);
    console.log('google success');
    console.log(res);
    const code = res.code; // code is the authorization code that we need to send to the backend to get the id_token
    console.log(code);
    if (code) {
      try {
        const response = await Signin(code);
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        await handleNotification();
        navigate('/dashboard', { replace: true });
        console.log('sucessfully logged in');
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  const googleFailure = (err) => {
    console.log(err);
    // need to add toast error message
  };

  const googlelogin = useGoogleLogin({
    onSuccess: googleSuccess,
    onNonOAuthError: googleFailure,
    flow: 'auth-code',
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: { clientId },
        scope: '',
      });
    }
    gapi.load('client', start);
    setLoading(false);
  }, []);

  const isLaptop = useMediaQuery('(min-width:1020px)');
  const isTablet = useMediaQuery('(min-width:425px)') && !isLaptop;
  const isMobile = useMediaQuery('(max-width:425px)') && !isTablet;
  const [bgFilter, setBgFilter] = useState('');
  console.log({ isLaptop, isMobile, isTablet });

  return (
    <>
      <Helmet>
        <title> Login | SmartMess </title>
      </Helmet>
      <Spin spinning={loading} size="medium">
        <Container
          disableGutters
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'clip',
            minWidth:"100vw"
          }}
        >
          <img
            src={`https://res.cloudinary.com/dowydptqe/image/upload/w_${
              isLaptop ? '3000' : isTablet ? '2000' : isMobile ? '1000' : 'auto'
            }/f_auto,q_${isLaptop?'70':'40'}/v1/smart_mess/zdsrw9hbetv5lnkqvcyx`}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              position: 'absolute',
            }}
            alt="IIT Dh Mess"
          />
          <Logo
            sx={{
              position: 'fixed',
              top: { xs: 16, sm: 24, md: 40 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          />
          <div
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{
                padding: '100px',
                borderRadius: '10px',
                backdropFilter: bgFilter,
                transition: '0.3s',
              }}
              component="div"
              onMouseEnter={() => {
                setBgFilter((bgFilter) => {
                  bgFilter = 'brightness(0.95) blur(4px)';
                  return bgFilter;
                });
              }}
              onMouseLeave={() => {
                setBgFilter((bgFilter) => {
                  bgFilter = '';
                  return bgFilter;
                });
              }}
            >
              <GoogleButton onClick={googlelogin} />
            </Stack>
          </div>
        </Container>

        {/* <StyledRoot>
          {mdUp && (
            <Logo
              sx={{
                position: 'fixed',
                top: { xs: 16, sm: 24, md: 40 },
                left: { xs: 16, sm: 24, md: 40 },
              }}
            />
          )}

          {mdUp && (
            <StyledSection>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome to Bhoopali Mess
              </Typography>
              <img src="/assets/illustrations/mess.webp" alt="login" />
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Stack direction="row" justifyContent="center">
                {!mdUp && (
                  <Logo
                    sx={{
                      width: '100px',
                      minHeight: '100px',
                    }}
                  />
                )}
              </Stack>
              <br />
              <Stack direction="row" justifyContent="center" spacing={2}>
                <GoogleButton onClick={googlelogin} />
              </Stack>
            </StyledContent>
          </Container>
        </StyledRoot> */}
      </Spin>
    </>
  );
}
