import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductAddComponent>
  ) {
    this.productForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['ACTIVE', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct = {
        ...this.productForm.value,
        createdTime: getCurrentTimestamp(),
        updatedTime: getCurrentTimestamp(),
      };

      this.productService.create(newProduct).subscribe(() => {
        alert("Product added!")
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
