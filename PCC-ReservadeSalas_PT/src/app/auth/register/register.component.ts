import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User('', '', []); 
  registerSuccess: boolean = false;
  registerError: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    localStorage.clear();
  }

  register(): void {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.registerSuccess = true;
        this.registerError = '';
      },
      (error) => {
        this.registerSuccess = false;
        this.registerError = 'O registro falhou. Por favor tente novamente.';
        console.error('Registration failed', error);
      }
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
