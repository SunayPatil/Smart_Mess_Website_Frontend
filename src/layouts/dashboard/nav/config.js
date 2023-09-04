// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Menu',
    path: '/dashboard/menu',
    icon: icon('ic_menu'),
  },
  {
    title: 'Feedback',
    path: '/404',
    icon: icon('ic_cart'),
  },
  {
    title: 'Rating',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Attendance',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;