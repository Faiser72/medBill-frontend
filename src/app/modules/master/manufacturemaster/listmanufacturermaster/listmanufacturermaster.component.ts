import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmanufacturermaster',
  templateUrl: './listmanufacturermaster.component.html',
  styleUrls: ['./listmanufacturermaster.component.scss']
})
export class ListmanufacturermasterComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "manufacturerName",
    "address",
    "phoneNumber",
    "contactPersonName",
    "contactPersonPhoneNumber",
    "emailId",
    "action"
  ];

  userDetailsList: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.patientNumber.patientNumber + data.doctorName.doctorName + data.patientName + data.phoneNumber + data.appointmentDate + data.appointmentTime;
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

  routeToDeleteUser(userDetails) {
  }


  routeToEditManufacturer() {
    this.route.navigate(['manufacturerMasterHome/editmanufacturer'])
  }

  routeToAddManufacturer() {
    this.route.navigate(['manufacturerMasterHome/addmanufacturer'])
  }
}