import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, ForgotPaswordDialog } from './login/login.component';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatDialogModule, MatTooltipModule, MatStepperModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangepasswordComponent } from './changepassword/changepassword.component';



@NgModule({
  declarations: [LoginComponent, ForgotPaswordDialog, ChangepasswordComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgxSpinnerModule,
    MatButtonModule
  ],
  entryComponents: [ForgotPaswordDialog]
})
export class LoginModule { }
