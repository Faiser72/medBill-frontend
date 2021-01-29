import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseEntryComponent } from './purchase-entry/purchase-entry.component';
import { ListPurchaseEntryComponent } from './list-purchase-entry/list-purchase-entry.component';
import { UpdatePurchaseEntryComponent } from './update-purchase-entry/update-purchase-entry.component';
import { PurchaseEntryHomeComponent } from './purchase-entry-home/purchase-entry-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';



@NgModule({
  declarations: [PurchaseEntryComponent, ListPurchaseEntryComponent, UpdatePurchaseEntryComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class PurchaseModule { }
