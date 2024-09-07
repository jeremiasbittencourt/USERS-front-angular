import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', password_confirmation: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.successMessage = 'Usuário registrado com sucesso!';
        this.errorMessage = '';
      },
      (error) => {
        this.successMessage = '';
        if (error.status === 422) {
          // Erros de validação
          this.errorMessage = this.extractValidationErrors(error.error.errors);
        } else {
          this.errorMessage = 'Ocorreu um erro ao registrar. Tente novamente.';
        }
      }
    );
  }

  private extractValidationErrors(errors: any): string {
    let messages = [];
    for (let field in errors) {
      if (errors.hasOwnProperty(field)) {
        messages.push(errors[field].join(' '));
      }
    }
    return messages.join(' ');
  }
}