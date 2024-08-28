import { Component, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InvoiceAddComponent } from '../invoice-add/invoice-add.component';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatDialogModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceListComponent {
  themeClass = 'ag-theme-alpine';

  colDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true },
    { headerName: 'Customer Name', valueGetter: (params) => params.data.customer.name, sortable: true, filter: 'agTextColumnFilter' },
    { field: 'invoiceAmount', headerName: 'Invoice Amount', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'invoiceDate', headerName: 'Invoice Date', sortable: true, filter: 'agDateColumnFilter' },
    {
      headerName: 'Actions',
      cellRenderer: () => {
        return `
          <button class="btn-edit" data-action="edit">Edit</button>
          <button class="btn-delete" data-action="delete">Delete</button>
          <button class="btn-danger" data-action="pdf">PDF</button>
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

  constructor(private invoiceService: InvoiceService, private router: Router, private dialog: MatDialog) {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.rowData = data;
    });
  }

  onCellClicked(event: any): void {
    const action = event.event.target.getAttribute('data-action');
    if (action === 'edit') {
      this.editInvoice(event.data);
    } else if (action === 'delete') {
      this.deleteInvoice(event.data);
    }
  }

  editInvoice(invoice: any): void {
    this.router.navigate([`/invoice/${invoice.id}`]);
  }

  deleteInvoice(invoice: any): void {
    if (confirm(`Do you want to delete Invoice ID: ${invoice.id}?`)) {
      this.invoiceService.deleteInvoice(invoice.id).subscribe(() => {
        alert("Invoice deleted!");
        this.loadInvoices();
      });
    }
  }

  addInvoice(): void {
    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(InvoiceAddComponent, {
        width: '400px',
        panelClass: 'center-dialog-container',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.loadInvoices();
        }
      });
    }
  }
}
