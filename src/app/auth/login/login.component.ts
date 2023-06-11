import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import jwtDecode from 'jwt-decode';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public loginUser(loginForm: NgForm): void {
    this.authService.loginUser(loginForm.value).subscribe((res: any) => {
      alert(JSON.stringify(jwtDecode(res)));

      this.authService.setUser(res);
    });
  }
}
