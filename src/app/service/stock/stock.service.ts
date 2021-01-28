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
}
