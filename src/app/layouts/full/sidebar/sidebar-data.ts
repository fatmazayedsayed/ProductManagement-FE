import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Manage Categories',
    iconName: 'layout-dashboard',
    route: '/admin/categoryList',
  },
  {
    displayName: 'Product Management',
    iconName: 'rosette',
    route: '/admin/productList',
  },  
];
