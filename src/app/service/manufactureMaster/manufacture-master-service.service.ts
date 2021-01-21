import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManufactureMasterServiceService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // get manufactureList 
  manufactureList() {
    return this.http.get(`${this.baseUrl}/manufactureMaster/manufactureList`);
  }

  //addManufacture Master
  addManufacture(manufactureDetails: any) {
    return this.http.post(`${this.baseUrl}/manufactureMaster/addManufacture`, manufactureDetails);
  }

  // deleteManufactureDetails Master
  deleteManufactureDetails(manufacturerId: any) {
    return this.http.put(`${this.baseUrl}/manufactureMaster/deleteManufactureDetails`, null, { params: { manufacturerId: manufacturerId } });
  }

  // updateManufactureDetails Master
  updateManufactureDetails(manufactureDetails: any) {
    return this.http.put(`${this.baseUrl}/manufactureMaster/updateManufactureDetails`, manufactureDetails);
  }

  // get list of data except this id for validate unique in (edit)
  getManufactureListExceptOne(manufacturerId: number) {
    return this.http.get(`${this.baseUrl}/manufactureMaster/getManufactureListExceptOne/${manufacturerId}`);
  }

  
  // get getManufacturerDetails by id
  getManufacturerDetails(manufacturerId: number) {
    return this.http.get(`${this.baseUrl}/manufactureMaster/getManufacturerDetails/${manufacturerId}`)
  }
}
