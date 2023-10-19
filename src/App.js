import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import clientId from './constants/client-id';
import ApiState from './Context/apiState';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ApiState>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ApiState>
    </GoogleOAuthProvider>
  );
}
