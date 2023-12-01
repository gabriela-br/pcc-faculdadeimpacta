import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User('', '', null); 
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    localStorage.clear();
  }

  login(): void {
    this.authService.login(this.user).subscribe(
      (response: User) => {
        this.user.authorities = response.authorities;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/lista-de-reservas'], { relativeTo: this.route });
      },
      (error) => {
        this.loginError = 'Falha na autenticação. Por favor verifique o seu usuário e senha.';
        console.error('Login failed', error);
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }
}