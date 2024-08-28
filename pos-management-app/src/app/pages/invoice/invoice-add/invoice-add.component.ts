import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule],
  templateUrl: './invoice-add.component.html',
  styleUrl: './invoice-add.component.scss'
})
export class InvoiceAddComponent {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private dialogRef: MatDialogRef<InvoiceAddComponent>
  ) {
    this.invoiceForm = this.fb.group({
      id: [null, Validators.required],
      customer_id: ['', Validators.required],
      invoice_amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const newInvoice = {
        ...this.invoiceForm.value,
        createdTime: getCurrentTimestamp(),
        updatedTime: getCurrentTimestamp(),
        invoice_date: getCurrentTimestamp()
      };

      this.invoiceService.createInvoice(newInvoice).subscribe(() => {
        alert("Invoice added!")
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
