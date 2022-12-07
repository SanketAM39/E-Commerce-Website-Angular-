import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private authService: ApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('User-Token')}`,
      },
    });
    return next.handle(req).pipe();
  }
}
