import { ManufactureMasterServiceService } from './../../../../service/manufactureMaster/manufacture-master-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listmanufacturermaster',
  templateUrl: './listmanufacturermaster.component.html',
  styleUrls: ['./listmanufacturermaster.component.scss']
})
export class ListmanufacturermasterComponent implements OnInit {

  manufacturerDetailsList:any;

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "manufacturerName",
    "address",
    "contactNumber",
    "contactPersonName",
    "contactPersonNumber",
    "contactPersonEmailId",
    "action"
  ];

  userDetailsList: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: Router,
    private _snackBar: MatSnackBar,
    private manufactureService: ManufactureMasterServiceService) { }

  ngOnInit() {
    this.manufactureService.manufactureList().subscribe((data: any) => {
      if (data.success) {
        this.manufacturerDetailsList = data['listObject'];
        console.log(this.manufacturerDetailsList[0].dob);

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

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.patientNumber.patientNumber + data.doctorName.doctorName + data.patientName + data.contactNumber + data.appointmentDate + data.appointmentTime;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToDeleteManufacturer(manufacturerDetails) {
    if (confirm(`Are you sure to delete this Manufacturer ?`)) {
      let index = this.manufacturerDetailsList.findIndex((data: any) => data.manufacturerId === manufacturerDetails.manufacturerId);
      if ((manufacturerDetails.manufacturerId > 0) && (index > -1)) {
        this.manufactureService.deleteManufactureDetails(manufacturerDetails.manufacturerId).subscribe((resp: any) => {
          if (resp.success) {
            this.manufacturerDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.manufacturerDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.customFilter();
          }
          this._snackBar.open(manufacturerDetails.manufacturerName, resp.message, { duration: 2500 });
        });
      }
    }
  }

  routeToEditManufacturer(manufacturerDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { manufacturerId: manufacturerDetails.manufacturerId }
    };
    this.route.navigate(["/home/manufacturerMasterHome/editmanufacturer"], navigationExtras);
  }

  routeToAddManufacturer() {
    this.route.navigate(['home/manufacturerMasterHome/addmanufacturer'])
  }
}