import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceProduct } from '../models/invoice-product';

const baseUrl = 'http://localhost:3000/invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http : HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${baseUrl}`);
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${baseUrl}`, invoice);
  }

  createInvoiceProduct(invoiceProduct: InvoiceProduct): Observable<InvoiceProduct> {
    return this.http.post<InvoiceProduct>(`${baseUrl}`, invoiceProduct);
  }

  get(id: any): Observable<Invoice> {
    return this.http.get<Invoice>(`${baseUrl}/${id}`);
  }

  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  getInvoiceProducts(invoiceId: string): Observable<InvoiceProduct[]> {
    return this.http.get<InvoiceProduct[]>(`${baseUrl}/${invoiceId}/products`);
  }
}
