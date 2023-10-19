import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';


// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import clientId from './constants/client-id';

// navigator.serviceWorker.controller.postMessage({title: 'Send message from client'})



navigator.serviceWorker.addEventListener('message', event => {
  const message = event.data;
  if (message.type === 'notification') {
    console.log('communication from service worker');
  }
});

// ----------------------------------------------------------------------

export default function App() {

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
