import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseEntryService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  // Save  purchaseEntryDetails
  savePurchaseEntryDetails(purchaseEntryDetails: any) {
    return this.http.post(`${this.baseUrl}/purchaseEntry/addPurchaseEntry`, purchaseEntryDetails);
  }


}
