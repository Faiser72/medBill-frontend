import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SupplierMasterService } from 'src/app/service/supplierMaster/supplier-master.service';

@Component({
  selector: 'app-listsuppliermaster',
  templateUrl: './listsuppliermaster.component.html',
  styleUrls: ['./listsuppliermaster.component.scss']
})
export class ListsuppliermasterComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";
  supplierList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "supplierName",
    "contactNumber",
    "contactPersonName",
    "contactPersonNumber",
    "contactPersonEmailId",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private supplierMasterService: SupplierMasterService,) { }

  ngOnInit() {
    this.supplierMasterService.getAllSupplierList().subscribe((data: any) => {
      if (data.success) {
        this.supplierList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  routeToDeleteSupplier(supplierDetails) {
    if (confirm(`Are you sure to delete this Supplier ?`)) {
      let index = this.supplierList.findIndex((data: any) => data.supplierId === supplierDetails.supplierId);
      if ((supplierDetails.supplierId > 0) && (index > -1)) {
        this.supplierMasterService.deleteSupplier(supplierDetails.supplierId).subscribe((resp: any) => {
          if (resp.success) {
            this.supplierList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.supplierList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.customFilter();
          }
          this._snackBar.open(supplierDetails.supplierId, resp.message, { duration: 2500 });
        });
      }
    }
  }


  routeToUpdateSupplier(supplierListDetail) {
    let navigationExtras: NavigationExtras = {
      queryParams: { supplierId: supplierListDetail.supplierId }
    };
    this.router.navigate(["/home/supplierMasterHome/editsupplier"], navigationExtras);
  }

  routeToAddManufacturer() {
    this.router.navigate(['/home/supplierMasterHome/addsupplier'])
  }
}