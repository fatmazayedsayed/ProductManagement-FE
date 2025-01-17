import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url ='http://localhost:5008/api/categories/';

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
    return this.http.delete(`${this.url}DeleteCategory`,  {
        params:  { CategoryId: id }
    });
  }
  getById(id: any) {
    return this.http.get(`${this.url}GetCategoryForView`, {
        params:  { CategoryId: id }
    });
}

  addcategory(body: any) {
    return this.http.post(`${this.url}upload`, body);
  }
  editcategory(body: any) {
    return this.http.put(`${this.url}UpdateCategory`, body);
  }

  getLookUpCategories() {
    return this.http.get(`${this.url}getLookUpCategories`);
  }
}
