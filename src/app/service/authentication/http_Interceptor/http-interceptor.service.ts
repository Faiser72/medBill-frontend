import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // spinner starts
    //this.spinner.show();
    if (sessionStorage.getItem(this.authenticationService.SESSION_TOKEN_KEY)) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem(this.authenticationService.SESSION_TOKEN_KEY)
        }
      });
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // setTimeout(() => {
          //   this.spinner.hide();  
          // }, 1000);  // spinner ends after 1 seconds
        }
      }, (error) => {
        //  this.spinner.hide();
      })
    );
  }
}

// File Name :-thhp-interceptor.service.ts	   	Created Date :-01-09-2020     Created By :- Faiser I (Emp. Id : VTPL/BLR/006)
	
// Description :- this is the service file to communicate wit api's 					
	
// ============================================================================================================================
//   Sl.No			    Description			                                Modified By		              	      Modified Date	
// ============================================================================================================================