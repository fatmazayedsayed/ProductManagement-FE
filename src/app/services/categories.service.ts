import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url ='http://localhost:5008/api/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  });

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber: number,
    pageSize: number,
    search: string,
    parentCategoryId: string,
    sort?: string
  ) {
    return this.http.get(
      `${this.url}GetCategory`, {
        params: {
          parentCategoryId: parentCategoryId ,
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
          searchString: search || ' ',
          Sorting: sort || '',
        }
      }
    );
  }
  
  delete(id: string) {
    return this.http.delete(`${this.url}categories/${id}`, { responseType: 'text' });
  }
  getById(id: any) {
    return this.http.get(`${this.url}categories/${id}`);
  }

  addcategory(body: any) {
    return this.http.post(`${this.url}categories/upload`, body);
  }
  editcategory(body: any) {
    return this.http.put(`${this.url}categories/UpdateCategory`, body);
  }

  getLookUpCategories() {
    return this.http.get(`${this.url}lookUp/getLookUpCategories`);
  }
}
