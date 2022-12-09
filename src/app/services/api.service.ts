import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: String = 'https://shop-api.ngminds.com';

  post(url: any, data: any) {
    return this.http.post(`${this.baseUrl}${url}`, data);
  }

  get(url: any) {
    return this.http.get(`${this.baseUrl}${url}`);
  }

  delete(url: any, id: number) {
    return this.http.delete(`${this.baseUrl}${url}${id}`);
  }

  patch(url: any, id: string, data: any) {
    return this.http.patch(`${this.baseUrl}${url}${id}`, data);
  }
}
