import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';
import { MatCardModule } from '@angular/material/card';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, NgIf],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerAddComponent>
  ) {
    this.customerForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['',[
        Validators.required,
        Validators.pattern(/^\+62\d{9,13}$/)
      ]],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const newCustomer = {
        ...this.customerForm.value,
        createdTime: getCurrentTimestamp(),
        updatedTime: getCurrentTimestamp(),
      };

      this.customerService.create(newCustomer).subscribe(() => {
        alert("Customer added!")
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
