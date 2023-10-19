import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MenuPage from './pages/MenuPage';
// import RatingsPage from './pages/RatingsPage';

import ManagerAddFood from './pages/ManagerAddFood';
// import MyMenuPage from './pages/MyMenuPage';

const MyMenuPage = lazy(()=> import("./pages/MyMenuPage"))
const RatingsPage = lazy(()=> import("./pages/RatingsPage"))



// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'menu', element: <MenuPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'ratings', element:  <Suspense fallback= 
        {<h1>Component1 are loading please wait...</h1>}> 
                        <RatingsPage /> 
                    </Suspense>  },
        { path: 'products', element: <ProductsPage /> },
        { path: 'addfooditem', element: <ManagerAddFood />},
        { path: 'mymenupage', element: <Suspense fallback= 
        {<h1>Component1 are loading please wait...</h1>}> 
                        <MyMenuPage /> 
                    </Suspense>}
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