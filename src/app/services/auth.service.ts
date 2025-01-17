import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl =
    'http://localhost:5008/api/';

  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${this.baseUrl}auth`, body);
  }
  public getToken(): string | null {
   console.log(localStorage.getItem('userData'));
    let token = JSON.parse(localStorage.getItem('userData') ?? '{}');
     return this.isLoggedIn() ? token : null;
  }
  public isLoggedIn(): boolean {
    let token = localStorage.getItem('userData');
     return token != null && token.length > 0;
  }
}
