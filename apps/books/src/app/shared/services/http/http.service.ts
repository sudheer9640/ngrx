import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(apiEndPoint: string) {
    return this.http.get(apiEndPoint);
  }

  post(apiEndPoint: string, payLoad: any) {
    return this.http.post(apiEndPoint, payLoad);
  }
}
