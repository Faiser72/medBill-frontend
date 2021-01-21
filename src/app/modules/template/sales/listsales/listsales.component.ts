import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  styleUrls: ['./listsales.component.scss']
})
export class ListsalesComponent implements OnInit {

  
  deleted_successfully_message: string = "Deleted Successfully";
  itemList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "itemCode",
    "itemName",
    "itemUnitOfMeasure",
    "itemUnitPrice",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,) { }

  ngOnInit() {
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToAddListItem() {
    this.router.navigate(['/home/salesHome/addSales'])
  }


}
