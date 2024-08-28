export const AppConstants = {
  APPLICATION_NAME: 'POS Management System',
  BASE_API_URL: '/my-api',
  LOG_OFF_ICON: 'sign-out'
};

export interface RouteLink {
  path: string;
  link: string;
}

export const RouterConfig = {
  LOGIN: {path: 'login', link: '/login', title: 'Login Page'},
  HOME: {path: '', link: '/'},
  PRODUCT: {path: 'product', link: '/product', title: 'Product Page'},
  INVOICE: {path: 'invoice', link: '/invoice', title: 'Invoice Page'},
  CUSTOMER: {path: 'customer', link: '/customer', title: 'Customer Page'},
  NOT_FOUND: {path: '**', link: null, title: 'Page Not Found'}
};
