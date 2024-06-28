import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inject:Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice=this.inject.get(LoginService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'bearer '+authservice.GetToken()
      }
    });
    return next.handle(jwtToken);
  }

}
