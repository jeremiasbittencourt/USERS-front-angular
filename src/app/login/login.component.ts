import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.successMessage = 'Login realizado com sucesso!';
        this.errorMessage = '';
        // Salve o token se houver e redirecione
        localStorage.setItem('token', response.token);
        this.router.navigate(['/users']);
      },
      (error) => {
        this.successMessage = '';
        if (error.status === 401) {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        } else {
          this.errorMessage = 'Ocorreu um erro ao fazer login. Tente novamente.';
        }
      }
    );
  }
}
