import { ProductmasterModule } from './productmaster/productmaster.module';
import { SuppliermasterModule } from './suppliermaster/suppliermaster.module';
import { RouterModule } from '@angular/router';
import { ManufacturemasterModule } from './manufacturemaster/manufacturemaster.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';



@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ManufacturemasterModule,
    RouterModule,
    SuppliermasterModule,
    ProductmasterModule,
  ]
})
export class MasterModule { }
