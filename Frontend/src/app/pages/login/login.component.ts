import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('auth-token', response.token);
        const role = response.role;
        if (role === 'admin') {
          this.router.navigate(['/Administrador']);
        } else {
          this.router.navigate(['/Catalogo']);
        }
        
        this.toastService.success("Login realizado com sucesso!");
      },
      error: () => {
        this.toastService.error("Credenciais inválidas. Tente novamente.");
      }
    });
  }

  navigate() {
    this.router.navigate(["/Cadastro"])
  }
}