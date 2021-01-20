import { ListproductmasterComponent } from './modules/master/productmaster/listproductmaster/listproductmaster.component';
import { EditproductmasterComponent } from './modules/master/productmaster/editproductmaster/editproductmaster.component';
import { AddproductmasterComponent } from './modules/master/productmaster/addproductmaster/addproductmaster.component';
import { ProductmasterhomeComponent } from './modules/master/productmaster/productmasterhome/productmasterhome.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { SalesByProductComponent } from './modules/reports/sales-by-product/sales-by-product.component';
import { OrderReportsComponent } from './modules/reports/order-reports/order-reports.component';
import { CurrentStocksAndAgingComponent } from './modules/reports/current-stocks-and-aging/current-stocks-and-aging.component';
import { ListsuppliermasterComponent } from './modules/master/suppliermaster/listsuppliermaster/listsuppliermaster.component';
import { EditsuppliermasterComponent } from './modules/master/suppliermaster/editsuppliermaster/editsuppliermaster.component';
import { AddsuppliermasterComponent } from './modules/master/suppliermaster/addsuppliermaster/addsuppliermaster.component';
import { SuppliermasterhomeComponent } from './modules/master/suppliermaster/suppliermasterhome/suppliermasterhome.component';
import { ListmanufacturermasterComponent } from './modules/master/manufacturemaster/listmanufacturermaster/listmanufacturermaster.component';
import { EditmanufacturermasterComponent } from './modules/master/manufacturemaster/editmanufacturermaster/editmanufacturermaster.component';
import { AddmanufacturermasterComponent } from './modules/master/manufacturemaster/addmanufacturermaster/addmanufacturermaster.component';
import { ManufacturermasterhomeComponent } from './modules/master/manufacturemaster/manufacturermasterhome/manufacturermasterhome.component';
import { ProductMasterComponent } from './modules/master/product-master/product-master.component';
import { ProductCategoryComponent } from './modules/master/product-category/product-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { CreateOrderComponent } from './modules/template/order/create-order/create-order.component';
import { ListOrderComponent } from './modules/template/order/list-order/list-order.component';
import { OrderHomeComponent } from './modules/template/order/order-home/order-home.component';
import { UpdateOrderComponent } from './modules/template/order/update-order/update-order.component';
import { ListPurchaseEntryComponent } from './modules/template/purchase/list-purchase-entry/list-purchase-entry.component';
import { PurchaseEntryHomeComponent } from './modules/template/purchase/purchase-entry-home/purchase-entry-home.component';
import { PurchaseEntryComponent } from './modules/template/purchase/purchase-entry/purchase-entry.component';
import { UpdatePurchaseEntryComponent } from './modules/template/purchase/update-purchase-entry/update-purchase-entry.component';
import { AddSalesComponent } from './modules/template/sales/add-sales/add-sales.component';
import { ListsalesComponent } from './modules/template/sales/listsales/listsales.component';
import { SalesHomeComponent } from './modules/template/sales/sales-home/sales-home.component';
import { UpdateSalesComponent } from './modules/template/sales/update-sales/update-sales.component';
import { StockDetailComponent } from './modules/template/stock/stock-detail/stock-detail.component';
import { LoginComponent } from './modules/login/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "home", component: DefaultComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "productCategory", component: ProductCategoryComponent },
      {
        path: "productMasterHome",
        component: ProductmasterhomeComponent,
        children: [
          { path: "addproductmaster", component: AddproductmasterComponent },
          { path: "editproductmaster", component: EditproductmasterComponent },
          { path: "listproductmaster", component: ListproductmasterComponent },
        ],
      },
      {
        path: "manufacturerMasterHome",
        component: ManufacturermasterhomeComponent,
        children: [
          { path: "addmanufacturer", component: AddmanufacturermasterComponent },
          { path: "editmanufacturer", component: EditmanufacturermasterComponent },
          { path: "listmanufacturer", component: ListmanufacturermasterComponent },
        ],
      },
      {
        path: "supplierMasterHome",
        component: SuppliermasterhomeComponent,
        children: [
          { path: "addsupplier", component: AddsuppliermasterComponent },
          { path: "editsupplier", component: EditsuppliermasterComponent },
          { path: "listsupplier", component: ListsuppliermasterComponent },
        ],
      },
      // {
      //   path: "orderHome",
      //   component: OrderHomeComponent,
      //   children: [
      //     { path: "addOrder", component: CreateOrderComponent },
      //     { path: "listOrder", component: ListOrderComponent },
      //     { path: "editOrder", component: UpdateOrderComponent },
      //   ],
      // },
      { path: "currentStocksAgingReport", component: CurrentStocksAndAgingComponent },
      { path: "orderReport", component: OrderReportsComponent },
      { path: "salesByProductReport", component: SalesByProductComponent },

      { path: "stockDetails", component: StockDetailComponent },
      {
        path: "orderHome",
        component: OrderHomeComponent,
        children: [
          { path: "addOrder", component: CreateOrderComponent },
          { path: "listOrder", component: ListOrderComponent },
          { path: "editOrder", component: UpdateOrderComponent },
        ],
      },
      {
        path: "puchaseEntryHome",
        component: PurchaseEntryHomeComponent,
        children: [
          { path: "addPurchaseEntry", component: PurchaseEntryComponent },
          { path: "listPurchaseEntry", component: ListPurchaseEntryComponent },
          { path: "editPurchaseEntry", component: UpdatePurchaseEntryComponent },
        ],
      },
      {
        path: "salesHome",
        component: SalesHomeComponent,
        children: [
          { path: "addSales", component: AddSalesComponent },
          { path: "listSales", component: ListsalesComponent },
          { path: "editSales", component: UpdateSalesComponent },
        ],
      },


    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
