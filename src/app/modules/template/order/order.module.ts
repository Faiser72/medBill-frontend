import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create-order/create-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';

@NgModule({
  declarations: [CreateOrderComponent, UpdateOrderComponent, ListOrderComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrderModule { }
