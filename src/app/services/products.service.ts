import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:5008/api/Products/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  });

  constructor(private http: HttpClient) { }

  getAll(
    pageNumber: number,
    pageSize: number,
    search: string,
    categoryId: string,
    sort?: string
  ) {
    return this.http.get(
      `${this.url}GetProduct`, {
      params: {
        categoryId: categoryId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        searchString: search || ' ',
        Sorting: sort || '',
      }
    }
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.url}DeleteProduct`, {
      params: { ProductId: id }
    });
  }
 
  getById(id: string) {
    return this.http.get(
      `${this.url}GetProductForView`, {
      params: {
        itemId: id,
      }
    });
  }
  
  addProduct(body: any) {
    // Send the body directly as an object (no FormData)
    return this.http.post(`${this.url}create`, body);
  }
  editProduct(body: any) { 
    return this.http.put(`${this.url}update`, body );
  }
  

  getLookUpCategories() {
    return this.http.get(`${this.url}getLookUpCategories`);
  }
}
