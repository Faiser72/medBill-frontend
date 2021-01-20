import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryMasterService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // get productCategoryList 
  productCategoryList() {
    return this.http.get(`${this.baseUrl}/productCategotyMaster/productCategoryList`);
  }

  //addProductCategory Master
  addProductCategory(productCategoryDetails: any) {
    return this.http.post(`${this.baseUrl}/productCategotyMaster/addProductCategory`, productCategoryDetails);
  }

  // deleteProductCategoryDetails Master
  deleteProductCategoryDetails(categoryId: any) {
    return this.http.put(`${this.baseUrl}/productCategotyMaster/deleteProductCategoryDetails`, null, { params: { categoryId: categoryId } });
  }

  // updateProductCategoryDetails Master
  updateProductCategoryDetails(productCategoryDetails: any) {
    return this.http.put(`${this.baseUrl}/productCategotyMaster/updateProductCategoryDetails`, productCategoryDetails);
  }

  // get list of data except this id for validate unique in (edit)
  getProductCategoryListExceptOne(categoryId: number) {
    return this.http.get(`${this.baseUrl}/productCategotyMaster/getProductCategoryListExceptOne/${categoryId}`);
  }

}
