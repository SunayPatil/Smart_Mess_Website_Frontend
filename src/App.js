import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { SocketContext, socket } from './Context/socket';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

import ScrollToTop from './components/scroll-to-top';
import clientId from './constants/client-id';
import ApiState from './Context/apiState';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import Backdrop  from '@mui/material/Backdrop';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SocketContext.Provider value={socket}>
        <ApiState>
          <HelmetProvider>
            <BrowserRouter>
              <ThemeProvider>
                <ScrollToTop />
                <Suspense fallback={<Backdrop />}>
                  <Router />
                </Suspense>
              </ThemeProvider>
            </BrowserRouter>
          </HelmetProvider>
        </ApiState>
      </SocketContext.Provider>
      <ToastContainer position="top-right" autoClose={2000} limit={2} />
    </GoogleOAuthProvider>
  );
}
