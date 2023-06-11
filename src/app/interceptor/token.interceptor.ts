import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.accessToken;

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          alert('باید دوباره وارد شوید');
          this.router.navigate(['/']);
        }

        if ([500].includes(err.status)) {
          alert(' خطا در ارتباط با سرور ، لطفا دوباره تلاش کنید.');
        }

        return throwError(err?.error);
      })
    );
  }
}
