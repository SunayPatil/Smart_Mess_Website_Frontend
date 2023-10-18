import React, { useEffect, useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MenuPage from './pages/MenuPage';
import RatingsPage from './pages/RatingsPage';
import ManagerAddFood from './pages/ManagerAddFood';
import MyMenuPage from './pages/MyMenuPage';
import ApiContext from './Context/apiContext';

// ----------------------------------------------------------------------

export default function Router() {
  const context = useContext(ApiContext);
  const { getAllNotificatons } = context;

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'notification') {
        console.log('communication from service worker');
        getAllNotificatons();
      }
    });
  }, []);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'menu', element: <MenuPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'ratings', element: <RatingsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'addfooditem', element: <ManagerAddFood /> },
        { path: 'mymenupage', element: <MyMenuPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
