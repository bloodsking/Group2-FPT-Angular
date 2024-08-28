import { Routes } from '@angular/router';
import { RouterConfig } from './config/app.constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RouterConfig.LOGIN.path,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routes')
            .then(m => m.loginRoutes)
  },
  {
    path: RouterConfig.LOGIN.path,
    loadChildren: () =>
        import('./pages/login/login.routes')
            .then(m => m.loginRoutes)
  },
  {
    path: RouterConfig.PRODUCT.path,
    loadChildren: () =>
        import('./pages/product/product.routes')
            .then(m => m.productRoutes)
  },
  {
    path: RouterConfig.INVOICE.path,
    loadChildren: () =>
        import('./pages/invoice/invoice.routes')
            .then(m => m.invoiceRoutes)
  },
  {
    path: RouterConfig.CUSTOMER.path,
    loadChildren: () =>
        import('./pages/customer/customer.routes')
            .then(m => m.customerRoutes)
  }
];
