import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductmasterComponent } from './addproductmaster/addproductmaster.component';
import { EditproductmasterComponent } from './editproductmaster/editproductmaster.component';
import { ListproductmasterComponent } from './listproductmaster/listproductmaster.component';
import { ProductmasterhomeComponent } from './productmasterhome/productmasterhome.component';



@NgModule({
  declarations: [AddproductmasterComponent, EditproductmasterComponent, ListproductmasterComponent, ProductmasterhomeComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProductmasterModule { }
