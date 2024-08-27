import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { getCurrentTimestamp } from '../../../core/util/date-time.util';

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatDialogModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  themeClass =  'ag-theme-alpine';

  colDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { field: 'price', sortable: true, filter: 'agNumberColumnFilter' },
    {
      field: 'status',
      sortable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        textCustomComparator: (filter: string, value: string, filterText: string) => {
          return value === filterText;
        }
      }
     },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn-edit" data-action="edit">Edit</button>
          <button class="btn-toggle" data-action="toggle">
            ${params.data.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
          </button>
          <button class="btn-delete" data-action="delete">Delete</button>
        `;
      },
      sortable: false,
      filter: false,
      width: 200,
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    floatingFilter: true
  };

  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];

  rowData: any[] = [];

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
  }

  ngOnInit(): void {
      this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.rowData = data;
    });
  }

  onCellClicked(event: any): void {
    const action = event.event.target.getAttribute('data-action');
    if (action === 'edit') {
      this.editProduct(event.data);
    } else if (action === 'toggle') {
      this.toggleProductStatus(event.data);
    } else if (action === 'delete') {
      this.deleteProduct(event.data);
    }
  }

  editProduct(product: any): void {
    this.router.navigate([`/product/${product.id}`]);
  }

  toggleProductStatus(product: any): void {
    const updatedProduct = {
      ...product,
      status: product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      updatedTime: getCurrentTimestamp()};
    this.productService.update(product.id, updatedProduct).subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(product: any): void {
    if (confirm(`Do you want to delete ${product.name}?`)) {
      this.productService.delete(product.id).subscribe(() => {
        alert("Product deleted!");
        this.loadProducts();
      });
    }
  }

  addProduct(): void {
    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(ProductAddComponent, {
        width: '400px',
        panelClass: 'center-dialog-container',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.loadProducts();
        }
      });
    }
  }
}
