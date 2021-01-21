import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterServiceService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // get productList 
  productList() {
    return this.http.get(`${this.baseUrl}/productMaster/productList`);
  }

  //addProduct Master
  addProduct(productDetails: any) {
    return this.http.post(`${this.baseUrl}/productMaster/addProduct`, productDetails);
  }

  // deleteProductDetails Master
  deleteProductDetails(productId: any) {
    return this.http.put(`${this.baseUrl}/productMaster/deleteProductDetails`, null, { params: { productId: productId } });
  }

  // updateProductDetails Master
  updateProductDetails(productDetails: any) {
    return this.http.put(`${this.baseUrl}/productMaster/updateProductDetails`, productDetails);
  }

  // get list of data except this id for validate unique in (edit)
  getProductListExceptOne(productId: number) {
    return this.http.get(`${this.baseUrl}/productMaster/getProductListExceptOne/${productId}`);
  }

    
  // get Product by id
  getProductDetails(productId: number) {
    return this.http.get(`${this.baseUrl}/productMaster/getProductDetails/${productId}`)
  }

}
