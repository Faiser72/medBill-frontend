import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StockModule { }
