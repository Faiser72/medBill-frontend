import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // get listStock 
  getStockList() {
    return this.http.get(`${this.baseUrl}/stock/listStock`);
  }

  // get getStockItemList 
  getStockItemList() {
    return this.http.get(`${this.baseUrl}/stock/listAllStockItems`);
  }

  // get list of data except this id for validate unique in (edit)
  getStockListExceptOne(stockId: number) {
    return this.http.get(`${this.baseUrl}/stock/getStockListExceptOne/${stockId}`);
  }

  getStockItemListByProductId(productId: number) {
    return this.http.get(`${this.baseUrl}/stock/getStockItemListByProductId/${productId}`);
  }

  getAllNearByExpiryProducts(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/stock/getAllNearByExpiryProducts/${fromDate}/${toDate}`)
  }

  returnNearByexpiryStock(stockItemId: any) {
    return this.http.put(`${this.baseUrl}/stock/returnNearByexpiryStock`, null, { params: { stockItemId: stockItemId } });
  }

}
