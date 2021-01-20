import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  forgotPassword(forgotPasswordEmailId: any) {
    return this.httpClient.put(`${this.baseUrl}/forgotPassword`, null, { params: { "forgotPasswordEmailId": forgotPasswordEmailId } });
  }

  changePassword(currentPassword: any, newPassword: any) {
    return this.httpClient.put(`${this.baseUrl}/changePassword`, null, {
      params: {
        "currentPassword": currentPassword,
        "newPassword": newPassword
      }
    });
  }
}

// File Name :-password.service.ts	   	Created Date :-01-09-2020     Created By :- Faiser I (Emp. Id : VTPL/BLR/006)
	
// Description :- this is the service file to communicate wit api's 					
	
// ============================================================================================================================
//   Sl.No			    Description			                                Modified By		              	      Modified Date	
// ============================================================================================================================