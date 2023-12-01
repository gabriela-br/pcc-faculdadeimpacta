import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      const user: User = JSON.parse(currentUser);

      const credentials = `${user.username}:${user.password}`;
      const encodedCredentials = btoa(unescape(encodeURIComponent(credentials)));

      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}