import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {
  @Input() customer: any;
  @Output() customerUpdated = new EventEmitter<any>();

  phonePattern = "^\\+62\\d{9,13}$";

  constructor(private customerService: CustomerService, private router: Router) {}

  updateCustomer(form: NgForm): void {
    if (form.valid) {
      this.customer.updatedTime = getCurrentTimestamp();

      this.customerService.update(this.customer.id, this.customer).subscribe(updatedCustomer => {
        this.customerUpdated.emit(updatedCustomer);
        alert("Customer updated!");
        this.router.navigate(['/customer']);
      });
    } else {
      alert("Please fill out the form correctly!");
    }
  }

  deleteCustomer(): void {
    if (confirm(`Do you want to delete ${this.customer.name}?`)) {
      this.customerService.delete(this.customer.id).subscribe(() => {
        alert("Customer deleted!");
        this.router.navigate(['/customer']);
      });
    }
  }
}
