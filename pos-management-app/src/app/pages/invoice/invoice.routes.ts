import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const invoiceRoutes: Routes = [
  { path: '', component: InvoiceListComponent},
  { path: ':id', component: InvoiceDetailComponent}
];
