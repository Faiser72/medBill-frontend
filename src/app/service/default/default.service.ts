import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})

export class DefaultService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  home() {
    return this.httpClient.get(`${this.baseUrl}/home`);
  }

}
