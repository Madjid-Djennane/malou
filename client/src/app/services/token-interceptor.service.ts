import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${'793yW4X8-oWuk2zCxHVUpziPxb4FlJruFUAjtPf14jU'}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
