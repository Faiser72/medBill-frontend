import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddmanufacturermasterComponent } from './addmanufacturermaster/addmanufacturermaster.component';
import { EditmanufacturermasterComponent } from './editmanufacturermaster/editmanufacturermaster.component';
import { ListmanufacturermasterComponent } from './listmanufacturermaster/listmanufacturermaster.component';
import { ManufacturermasterhomeComponent } from './manufacturermasterhome/manufacturermasterhome.component';



@NgModule({
  declarations: [AddmanufacturermasterComponent, EditmanufacturermasterComponent, ListmanufacturermasterComponent, ManufacturermasterhomeComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ManufacturemasterModule { }
