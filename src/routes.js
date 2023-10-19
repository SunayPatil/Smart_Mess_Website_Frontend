import { Navigate, useRoutes } from 'react-router-dom';
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
import RatingsPage from './pages/RatingsPage';
import ManagerAddFood from './pages/ManagerAddFood';
import MyMenuPage from './pages/MyMenuPage';
import ManagerDashboard from './pages/ManagerDashboard';


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
        { path: 'ratings', element: <RatingsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'addfooditem', element: <ManagerAddFood /> },
        { path: 'mymenupage', element: <MyMenuPage /> },
        { path: 'summary', element: <ManagerDashboard /> }
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