import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url =
    'https://gbg-dev-cvrankingapi-f7a2b3gtfvcag3a0.uksouth-01.azurewebsites.net/api/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  });

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: any, search: String, sorting: string) {
    return this.http.get(
      `${this.url}product/GetProfileList?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchString=${search}&Sorting=${sorting}`
    );
  }
  delete(id: string) {
    return this.http.delete(`${this.url}product/${id}`, {
      responseType: 'text',
    });
  }

  addProfile(body: any) {
    return this.http.post(`${this.url}product/AddProfile`, body);
  }

  editProfile(body: any) {
    return this.http.put(`${this.url}product/update`, body);
  }

  getProfileById(id: string) {
    return this.http.get(`${this.url}product/${id}`);
  }
}
