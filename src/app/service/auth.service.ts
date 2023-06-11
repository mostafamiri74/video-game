import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClientModule,
    private cookieService: CookieService
  ) {}

  public loginUser(userInfo: any): Observable<any> {
    // return this.http.post<any>('url/login' , userInfo)
    return of(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
  }

  public setUser(userToken: any) {
    this.cookieService.set('accessToken', userToken);
  }

  public get accessToken(): string {
    return this.cookieService.get('accessToken');
  }
}
