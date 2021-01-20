import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { UpdateSalesComponent } from './update-sales/update-sales.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { ListsalesComponent } from './listsales/listsales.component';



@NgModule({
  declarations: [AddSalesComponent, UpdateSalesComponent, ListsalesComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalesModule { }
