import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByProductComponent } from './sales-by-product/sales-by-product.component';
import { CurrentStocksAndAgingComponent } from './current-stocks-and-aging/current-stocks-and-aging.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';
import { PurchaseReportByPaymentModeComponent } from './purchase-report-by-payment-mode/purchase-report-by-payment-mode.component';



@NgModule({
  declarations: [SalesByProductComponent, CurrentStocksAndAgingComponent, OrderReportsComponent, PurchaseReportByPaymentModeComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class ReportsModule { }
