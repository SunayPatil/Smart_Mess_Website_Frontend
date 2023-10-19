// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    role: "all",
  },
  {
    title: 'Menu',
    path: '/dashboard/mymenupage',
    icon: icon('ic_menu'),
    role: "all",
  },
  {
    title: 'Feedback',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    role: "user",
  },
  {
    title: 'Rating',
    path: '/dashboard/ratings',
    icon: icon('ic_blog'),
    role: "user",
  },
  // {
  //   title: 'Attendance',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  //   role: "all",
  // },
  {
    title: 'Edit Food Item',
    path: '/dashboard/addfooditem',
    icon: icon('ic_disabled'),
    role: "manager",
  },
  {
    title: 'View Summary',
    path: '/dashboard/summary',
    icon: icon('ic_summary'),
    role: "manager",
  }

];

export default navConfig;