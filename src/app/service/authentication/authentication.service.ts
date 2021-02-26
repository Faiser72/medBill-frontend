import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { isNull } from 'util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  SESSION_TOKEN_KEY = 'token';
  SESSION_USER_KEY = 'user';
  SESSION_ROLE_KEY = 'role';
  SESSION_USER_ID_KEY = 'uId'

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/authenticate`, { username, password }).pipe(map((data) => {
      if (!isNull(data)) {
        let jwtToken = 'Bearer ' + data.jwtToken;
        sessionStorage.setItem(this.SESSION_TOKEN_KEY, jwtToken);
        sessionStorage.setItem(this.SESSION_USER_KEY, data.username);
        sessionStorage.setItem(this.SESSION_ROLE_KEY, data.role);
        return true;
      } else {
        return false;
      }
    }));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.SESSION_USER_KEY);
    if (user === null) return false;
    return true;
  }

  getLoggedUser() {
    let user = sessionStorage.getItem(this.SESSION_USER_KEY);
    if (user === null) return '';
    return user;
  }

  getLoggedUserRole() {
    let role = sessionStorage.getItem(this.SESSION_ROLE_KEY);
    if (role === null) return '';
    return role;
  }

  logout() {
    sessionStorage.removeItem(this.SESSION_ROLE_KEY);
    sessionStorage.removeItem(this.SESSION_USER_KEY);
    sessionStorage.removeItem(this.SESSION_TOKEN_KEY);
    sessionStorage.removeItem(this.SESSION_USER_ID_KEY);
    return true;
  }

}

// File Name :-authentication.service.ts	   	Created Date :-01-09-2020     Created By :- Faiser I (Emp. Id : VTPL/BLR/006)

// Description :- this is the service file to communicate wit api's 					

// ============================================================================================================================
//   Sl.No			    Description			                                Modified By		              	      Modified Date	
// ============================================================================================================================