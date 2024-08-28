import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { NgIf } from '@angular/common';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgIf, CustomerEditComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  customer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const customerId = params['id'];
        this.loadCustomer(customerId);
      });
  }

  loadCustomer(customerId: string): void {
    this.customerService.get(customerId).subscribe(data => {
      this.customer = data;
    });
  }

  onCustomerUpdated(updatedCustomer: any): void {
    this.customer = updatedCustomer;
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }
}
