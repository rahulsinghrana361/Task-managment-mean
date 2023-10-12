import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly API_URL;

  constructor(private http: HttpClient) { 
    this.API_URL = "http://localhost:3000";
  }

  get(uri: String) {
    return this.http.get<any>(`${this.API_URL}/${uri}`);
  }
  post(uri: String,payload: Object) {
    return this.http.post<any>(`${this.API_URL}/${uri}`,payload);
  }

  patch(uri: String,payload: Object) {
    return this.http.put<any>(`${this.API_URL}/${uri}`,payload);
  }

  delete(uri: String) {
    return this.http.delete<any>(`${this.API_URL}/${uri}`);
  }
}
