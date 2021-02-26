import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { UpdateSalesComponent } from './update-sales/update-sales.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { ListsalesComponent } from './listsales/listsales.component';
import { ReturnSalesComponent } from './return-sales/return-sales.component';
import { DeletedSalesOrdersComponent } from './deleted-sales-orders/deleted-sales-orders.component';
import { CanceledSalesOrdersComponent } from './canceled-sales-orders/canceled-sales-orders.component';



@NgModule({
  declarations: [AddSalesComponent, UpdateSalesComponent, ListsalesComponent, ReturnSalesComponent, DeletedSalesOrdersComponent, CanceledSalesOrdersComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalesModule { }
