import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss']
})
export class PurchaseEntryComponent implements OnInit {

  allSupplierName = [
    { value: 'Om Medi Serve', viewValue: 'Local' },
    { value: 'Hira Drug House', viewValue: 'Interstate' },
    { value: 'Veto Drug House', viewValue: 'Interstate' },
  ]; 

   
  deleted_successfully_message: string = "Deleted Successfully";
  itemList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "itemCode",
    "itemName",
    "itemUnitOfMeasure",
    "itemUnitPrice",
    "quanttity",
    "unitPrice",
    "batchName",
    "manufactureDate",
    "expiryDate",
    "totalAmount",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  addPurchaseEntry: FormGroup;
  constructor(private fb: FormBuilder,
    private route: Router, ) { }

  ngOnInit() {
    this.addPurchaseEntry = this.fb.group({
      orderId: ['', Validators.required],
      orderDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      supplierName: ['', Validators.required],
      supplierInvoiceNumber: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
