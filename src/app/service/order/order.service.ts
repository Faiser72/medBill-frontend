import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}


  // get productCategoryList 
  productCategoryList() {
    return this.http.get(`${this.baseUrl}/productCategotyMaster/productCategoryList`);
  }

   // get Supplier Detail by id
   getPrductsByCategoryId(categoryId: number) {     
    return this.http.get(
      `${this.baseUrl}/order/listProductByCategoryId/${categoryId}`
    );
  }

  // get All Order ID Pregenerated
  getOrderIdAuto() {    
    return this.http.get(this.baseUrl + '/order/getOrderIdAuto')
  }

   // Save  Order
   saveOrderDetails(addOrderDetails: any) { 
    return this.http.post(`${this.baseUrl}/order/addOrder`, addOrderDetails);    
  }

    // get orderList 
    orderList() {
      return this.http.get(`${this.baseUrl}/order/orderList`);
    }

}
