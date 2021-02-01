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

  // get listPurchaseEntry 
  getPurchaseEntryList() {
    return this.http.get(`${this.baseUrl}/purchaseEntry/listPurchaseEntry`);
  }

  // getPurchaseEntryItemListByPurchaseEntryId by id
  getPurchaseItemListByOrderId(purchaseEntryId: number) {
    return this.http.get(`${this.baseUrl}/purchaseEntry/getPurchaseEntryItemListByPurchaseId/${purchaseEntryId}`)
  }

  // getPurchaseEntryDetailsById by id
  getPurchaseEntryDetailsById(purchaseEntryId: number) {
    return this.http.get(`${this.baseUrl}/purchaseEntry/getPurchaseEntryDetailsById/${purchaseEntryId}`)
  }

  // get list of data except this id for validate unique in (edit)
  getPurchaseEntryListExceptOne(purchaseEntryId: number) {
    return this.http.get(`${this.baseUrl}/purchaseEntry/getPurchaseEntryListExceptOne/${purchaseEntryId}`);
  }

  // updatePurchaseEntryDetails Master
  updatePurchaseEntryDetails(purchaseEntryDetails: any) {
    return this.http.put(`${this.baseUrl}/purchaseEntry/updatePurchaseEntryDetails`, purchaseEntryDetails);
  }
}
