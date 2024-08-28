import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';
import { InvoiceService } from '../../../services/invoice.service';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer.model';
import { NgFor } from '@angular/common';

export function stringToDate(timestamp: string): Date {
  return new Date(timestamp.replace(' ', 'T'));
}

@Component({
  selector: 'app-invoice-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, NgFor],
  templateUrl: './invoice-add.component.html',
  styleUrl: './invoice-add.component.scss'
})
export class InvoiceAddComponent {
  invoiceForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<InvoiceAddComponent>
  ) {
    this.invoiceForm = this.fb.group({
      id: [null, Validators.required],
      customer_id: ['', Validators.required],
      invoice_amount: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]],
      selectedProducts: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe(customers => {
      this.customers = customers;
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  get selectedProducts(): FormArray {
    return this.invoiceForm.get('selectedProducts') as FormArray;
  }

  addProduct(product: any) {
    const productFormGroup = this.fb.group({
      product_id: [product.id, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      amount: [{ value: product.price, disabled: true }]
    });
    this.selectedProducts.push(productFormGroup);
    this.updateInvoiceAmount();
  }

  removeProduct(index: number) {
    this.selectedProducts.removeAt(index);
    this.updateInvoiceAmount();
  }

  updateInvoiceAmount() {
    let totalAmount = 0;
    this.selectedProducts.controls.forEach((control) => {
      const quantity = control.get('quantity')?.value || 0;
      const amount = control.get('amount')?.value || 0;
      totalAmount += quantity * amount;
    });
    this.invoiceForm.get('invoice_amount')?.setValue(totalAmount);
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const customer = this.customers.find(c => c.id === this.invoiceForm.value.customer_id);

      const selectedProducts = this.selectedProducts.controls.map((control) => {
        const product = this.products.find(p => p.id === control.get('product_id')?.value);
        return {
          invoiceId: this.invoiceForm.value.id,
          name: product.name,
          price: product.price,
          quantity: control.get('quantity')?.value,
          amount: control.get('quantity')?.value * product.price
        };
      });

      const currentTimestamp = getCurrentTimestamp();
      const newInvoice = {
        id: this.invoiceForm.value.id,
        customer: {
          id: customer.id,
          name: customer.name,
          phoneNumber: customer.phoneNumber,
          status: customer.status
        },
        products: selectedProducts,
        invoiceAmount: this.invoiceForm.get('invoice_amount')?.value,
        createdTime: stringToDate(currentTimestamp),
        updatedTime: stringToDate(currentTimestamp),
        invoiceDate: currentTimestamp.slice(0, 10)
      };

      this.invoiceService.createInvoice(newInvoice).subscribe(() => {
        alert("Invoice added!");
        this.dialogRef.close(true);
      });
    }
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Helper method to cast AbstractControl to FormGroup
  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}


