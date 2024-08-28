import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [NgIf, InvoiceEditComponent, NgFor],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit{
  invoice: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invoiceId = params['id'];
      this.loadInvoice(invoiceId);
    });
  }

  loadInvoice(invoiceId: string): void {
    this.invoiceService.get(invoiceId).subscribe(
      data => {
        this.invoice = data;
      }
    )
  }

  onInvoiceUpdated(updatedInvoice: any): void {
    this.invoice = updatedInvoice;
  }

  goBack(): void {
    this.router.navigate(['/invoice']);
  }
}
