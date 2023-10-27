import { useEffect,useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { Spin } from 'antd';
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
import { Signin, handleNotification } from '../utils/apis';

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
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate('/dashboard', { replace: true });
    }
  }, [])

  // const onSuccess = (res) => {
  //   console.log('login success ', res.profileObj);
  //   navigate('/dashboard', { replace: true });
  // };
  // const onFailure = (res) => {
  //   console.log('login failed ', res);
  // };

  const googleSuccess = async (res) => {
    setLoading(true)
    console.log('google success');
    console.log(res);
    const code = res.code; // code is the authorization code that we need to send to the backend to get the id_token
    console.log(code);
    if (code) {
      try {
        const response = await Signin(code);
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        await handleNotification();
        navigate('/dashboard', { replace: true });
        console.log("sucessfully logged in");
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false)
    
  };

  const googleFailure = (err) => {
    console.log(err);
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
    setLoading(false)
  }, []);

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>
      <Spin spinning={loading} size='medium'>
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
                Hi, Welcome to Bhoopali Mess
              </Typography>
              <img src="/assets/illustrations/mess.webp" alt="login" />
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Sign in using Google
              </Typography>

              <Stack direction="row" justifyContent="center" spacing={2}>
                {/* <Button fullWidth size="large" color="inherit" variant="outlined">
                  <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                </Button> */}

                {/* <Button fullWidth size="large" color="inherit" variant="outlined">
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
                </Button> */}
              </Stack>

              {/* <Button className="Button-login" onClick={googlelogin}>
                <div className="login-btn">SIGN IN</div>
              </Button> */}
              <Button onClick={googlelogin} fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              {/* <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
              </Divider>

              <LoginForm /> */}
            </StyledContent>
          </Container>
        </StyledRoot>
        </Spin>
    </>
  );
}
