import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  baseUrl =
    'https://gbg-dev-cvrankingapi-f7a2b3gtfvcag3a0.uksouth-01.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  getDropdownData(lookupCategory: string) {
    return this.http.get(`${this.baseUrl}lookUp/${lookupCategory}`);
  }

  buildQueryParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== '' && params[key] !== ' ') {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    return httpParams;
  }

  // searchCandidates(formValues: any, pageNumber: number, pageSize: number) {
  //   const url =
  //     'https://gbg-dev-cvrankingapi-f7a2b3gtfvcag3a0.uksouth-01.azurewebsites.net/api/CandidateSearch';
  //   const filteredBody = Object.keys(formValues)
  //     .filter((key) => formValues[key] !== null && formValues[key] !== '')
  //     .reduce((acc: any, key: any) => {
  //       acc[key] = formValues[key];
  //       return acc;
  //     }, {});

  //   const body = {
  //     ...formValues,
  //     PageNumber: pageNumber,
  //     PageSize: pageSize,
  //   };

  //   return this.http.post(url, body);
  // }
  searchCandidates(body: any) {
    return this.http.post(
      'https://gbg-dev-cvrankingapi-f7a2b3gtfvcag3a0.uksouth-01.azurewebsites.net/api/CandidateSearch',
      body
    );
  }
}
