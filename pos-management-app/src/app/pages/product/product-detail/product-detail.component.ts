import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { ProductEditComponent } from "../product-edit/product-edit.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, ProductEditComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const productId = params['id'];
        this.loadProduct(productId);
      });
  }

  loadProduct(productId: string): void {
    this.productService.get(productId).subscribe(data => {
      this.product = data;
    });
  }

  onProductUpdated(updatedProduct: any): void {
    this.product = updatedProduct;
  }

  goBack(): void {
    this.router.navigate(['/product']);
  }
}
