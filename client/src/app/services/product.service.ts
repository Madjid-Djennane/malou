import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private uri = 'https://api.producthunt.com/v1/posts?day=';

  getProducts(date) {
    return this.http.get(this.uri + date);
  }
}
