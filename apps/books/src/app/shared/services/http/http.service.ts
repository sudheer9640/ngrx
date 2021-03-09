import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(apiEndPoint: string): Observable<any> {
    return this.http.get(apiEndPoint);
  }

  post(apiEndPoint: string, payLoad: object): Observable<any> {
    return this.http.post(apiEndPoint, payLoad);
  }
}
