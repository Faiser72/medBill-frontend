import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


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


  // get orderListByOrderId by id
  orderListByOrderId(orderId: number) {
    return this.http.get(`${this.baseUrl}/order/orderListByOrderId/${orderId}`)
  }


  // get orderListByOrderId by id
  orderByOrderId(orderId: number) {
    return this.http.get(`${this.baseUrl}/order/orderByOrderId/${orderId}`)
  }


  // get All Order List
  getorderList() {
    return this.http.get(`${this.baseUrl}/order/orderList`);
  }

  // delete Order
  deleteOrderDetails(orderId: any) {
    return this.http.put(`${this.baseUrl}/order/deleteOrder`, null, { params: { "orderId": orderId } });
  }

  // Cancel Order
  cancelOrderDetails(orderId: any) {
    return this.http.put(`${this.baseUrl}/order/cancelOrder`, null, { params: { "orderId": orderId } });
  }

  // get All Deleted Order List
  getDeletedOrderList() {
    return this.http.get(`${this.baseUrl}/order/getAllDeletedOrders`);
  }

  // Undo Order
  undoDeletedOrder(orderId: any) {
    return this.http.put(`${this.baseUrl}/order/undoDeletedOrder`, null, { params: { "orderId": orderId } });
  }

  // get All Cancelled Order List
  getCancelledOrderList() {
    return this.http.get(`${this.baseUrl}/order/getAllCanceledOrders`);
  }

  // Undo Order
  undoCancelledOrder(orderId: any) {
    return this.http.put(`${this.baseUrl}/order/undoCanceledOrder`, null, { params: { "orderId": orderId } });
  }

  // Update Order Details
  updateOrderDetails(orderDetails: any) {
    return this.http.put(`${this.baseUrl}/order/updateOrderDetails`, orderDetails);
  }

  //delete Item From the Order List
  deleteOrderItemItem(orderItemId: any) {
    return this.http.put(`${this.baseUrl}/order/deleteOrderItem`, null, { params: { "orderItemId": orderItemId } });
  }

  getAllOrderListBtwnDates(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/order/getAllOrderListBtwnDates/${fromDate}/${toDate}`)
  }

}
