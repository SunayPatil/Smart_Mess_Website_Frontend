import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { resquestNotificationPermission, getfirebaseToken } from './notifications/firebase';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import clientId from './constants/client-id';

// ----------------------------------------------------------------------

export default function App() {
  const handleNotification = async () => {
    try {
      const permission = await resquestNotificationPermission();
      if (permission === 'granted') {
        const notificationToken = await getfirebaseToken();
        console.log('notificationToken', notificationToken);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleNotification();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}
