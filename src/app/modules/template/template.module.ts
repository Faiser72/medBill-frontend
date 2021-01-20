import { PurchaseModule } from './purchase/purchase.module';
import { OrderModule } from './order/order.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { SalesModule } from './sales/sales.module';



@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    OrderModule,
    PurchaseModule,
    SalesModule,
    MaterialImportModuleModule
  ]
})
export class TemplateModule { }
