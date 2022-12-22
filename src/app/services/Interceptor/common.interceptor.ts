import { ApiService } from "./../api.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private authService: ApiService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    if (request.url.includes("customers") || request.url.includes("/shop/")) {
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("customer-token")}`,
        },
      });
      return next.handle(req);
    } else {
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("User-Token")}`,
        },
      });
      return next.handle(req).pipe();
    }
  }
}
