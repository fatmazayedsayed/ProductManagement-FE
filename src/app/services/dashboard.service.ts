import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  url = 'http://localhost:5008/api/dashboard';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  });

  constructor(private http: HttpClient) { }

  getDashBoardData() {
    return this.http.get(`${this.url}`);
  }
}
