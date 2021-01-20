import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialImportModuleModule } from 'src/app/shared/material-import-module/material-import-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2OdometerModule } from 'ng2-odometer';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialImportModuleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OdometerModule,

  ]
})
export class DashboardModule { }
