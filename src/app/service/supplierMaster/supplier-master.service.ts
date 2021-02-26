import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SupplierMasterService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add supplier
  saveSupplierMaster(supplierMaster: any) {
    return this.http.post(
      `${this.baseUrl}/supplierMaster/addSupplier`,
      supplierMaster
    );
  }

  // get All Supplier List
  getAllSupplierList() {
    return this.http.get(this.baseUrl + "/supplierMaster/listSupplier");
  }

  // delete Supplier
  deleteSupplier(supplierId: any) {
    return this.http.put(
      `${this.baseUrl}/supplierMaster/deleteSupplier`,
      null,
      { params: { supplierId: supplierId } }
    );
  }

  // get Supplier Detail by id
  getSupplierDetailId(supplierId: number) {
    return this.http.get(
      `${this.baseUrl}/supplierMaster/getSupplierDetails/${supplierId}`
    );
  }

  // update Supplier Details
  updateSupplierDetail(supplierDetail: any) {
    return this.http.put(
      `${this.baseUrl}/supplierMaster/updateSupplierDetail`,
      supplierDetail
    );
  }
}

// File Name :-supplier.service.ts	   	Created Date :-15-01-2021    Created By :- Faiser I (Emp. Id : VTPL/BLR/006)
//                                                                   Created By :- Manjunath R (Emp. Id : VTPL/BLR/008)
// Description :- this is the service file to communicate wit api's

// ============================================================================================================================
//   Sl.No			    Description			                                Modified By		              	      Modified Date
// ============================================================================================================================
