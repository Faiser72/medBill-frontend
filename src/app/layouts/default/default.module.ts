import { TemplateModule } from 'src/app/modules/template/template.module';
import { DashboardModule } from './../../modules/dashboard/dashboard.module';
import { ReportsModule } from './../../modules/reports/reports.module';
import { MasterModule } from './../../modules/master/master.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialImportModuleModule } from "src/app/shared/material-import-module/material-import-module.module";
import { OrderHomeComponent } from 'src/app/modules/template/order/order-home/order-home.component';
import { PurchaseEntryHomeComponent } from 'src/app/modules/template/purchase/purchase-entry-home/purchase-entry-home.component';
import { SalesHomeComponent } from 'src/app/modules/template/sales/sales-home/sales-home.component';
import { StockDetailComponent } from 'src/app/modules/template/stock/stock-detail/stock-detail.component';

@NgModule({
  declarations: [
    DefaultComponent,
    OrderHomeComponent,
    PurchaseEntryHomeComponent,
    SalesHomeComponent,
    StockDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialImportModuleModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MasterModule,
    ReportsModule,
    DashboardModule,
    TemplateModule
  ],
})
export class DefaultModule { }
