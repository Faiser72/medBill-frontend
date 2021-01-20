import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddsuppliermasterComponent } from './addsuppliermaster/addsuppliermaster.component';
import { EditsuppliermasterComponent } from './editsuppliermaster/editsuppliermaster.component';
import { ListsuppliermasterComponent } from './listsuppliermaster/listsuppliermaster.component';
import { SuppliermasterhomeComponent } from './suppliermasterhome/suppliermasterhome.component';



@NgModule({
  declarations: [AddsuppliermasterComponent, EditsuppliermasterComponent, ListsuppliermasterComponent, SuppliermasterhomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialImportModuleModule,
    ReactiveFormsModule
  ]
})
export class SuppliermasterModule { }
