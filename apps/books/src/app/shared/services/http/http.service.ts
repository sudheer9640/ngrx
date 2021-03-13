import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Payload {
  [name: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(apiEndPoint: string) {
    return this.http.get(apiEndPoint);
  }

  post(apiEndPoint: string, payLoad: Payload) {
    return this.http.post(apiEndPoint, payLoad);
  }
}
