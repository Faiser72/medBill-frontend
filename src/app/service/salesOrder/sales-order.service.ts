import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // get All Sales Invoice Number Pregenerated
  getSalesInvoiceNumberAuto() {
    return this.http.get(this.baseUrl + '/salesOrder/getSalesOrderInvoiceNumber')
  }

  // get prdocut deatils by category id
  getPrductsByCategoryId(categoryId: number) {
    return this.http.get(
      `${this.baseUrl}/salesOrder/productListByCategoryId/${categoryId}`
    );
  }

  // Save Sales Order
  addSalesOrderDetails(salesOrderDetails: any) {
    console.log(salesOrderDetails);

    return this.http.post(`${this.baseUrl}/salesOrder/saveSalesOrder`, salesOrderDetails);
  }

  // get Sales Order
  allSalesOrderList() {
    return this.http.get(`${this.baseUrl}/salesOrder/getAllSalesOrders`);
  }

  // delete Sales Order
  deleteSalesOrderDetails(salesOrderId: any) {
    return this.http.put(`${this.baseUrl}/salesOrder/deleteSalesOrder`, null, { params: { "salesOrderId": salesOrderId } });
  }

  // get Stock Detail By Id
  getSalesOrderById(salesOrderId: number) {
    return this.http.get(`${this.baseUrl}/salesOrder/getSalesOrderDetail/${salesOrderId}`)
  }

  // get Sales Order by id
  getSalesOrderListById(salesOrderId: number) {
    return this.http.get(`${this.baseUrl}/salesOrder/getSalesOrderListById/${salesOrderId}`)
  }

  // Cancel Sales Order
  cancelSalesOrderDetails(salesOrderId: any) {
    return this.http.put(`${this.baseUrl}/salesOrder/cancelSalesOrder`, null, { params: { "salesOrderId": salesOrderId } });
  }

  // get All Deleted Sales Order List
  getDeletedSalesOrderList() {
    return this.http.get(`${this.baseUrl}/salesOrder/getAllDeletedSalesOrders`);
  }

  // get All Cancelled Sales Order List
  getcancelledSalesOrderList() {
    return this.http.get(`${this.baseUrl}/salesOrder/getAllCanceledSalesOrders`);
  }

  // Undo Order
  undoDeletedSalesOrder(salesOrderId: any) {
    return this.http.put(`${this.baseUrl}/salesOrder/undoDeletedSalesOrder`, null, { params: { "salesOrderId": salesOrderId } });
  }

  // Undo Order
  undoCancelledsalesOrder(salesOrderId: any) {
    return this.http.put(`${this.baseUrl}/salesOrder/undoCanceledSalesOrder`, null, { params: { "salesOrderId": salesOrderId } });
  }

  //delete Item From the sales Order List
  deleteSalesOrderItem(salesItemId: any) {
    console.log(salesItemId);

    return this.http.put(`${this.baseUrl}/salesOrder/deleteSalesOrderItem`, null, { params: { "salesItemId": salesItemId } });
  }

  getAllSalesListBtwnDatesAndPayment(fromDate: string, toDate: string, paymentMode: string) {
    return this.http.get(`${this.baseUrl}/salesOrder/getAllSalesListBtwnDatesAndPayment/${fromDate}/${toDate}/${paymentMode}`)
  }

}
