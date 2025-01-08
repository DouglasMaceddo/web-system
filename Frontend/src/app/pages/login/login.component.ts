import { Component } from '@angular/core';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
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
    // Verifica se o formulário é válido antes de prosseguir
    if (!this.loginForm.valid) {
      return;
    }
  
    // Desestrutura os valores do formulário para melhorar a leitura
    const { email, password } = this.loginForm.value;
  
    // Chama o serviço de login
    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        // Armazena o token de autenticação no sessionStorage
        sessionStorage.setItem('auth-token', response.token);
  
        // Verifica o papel do usuário e navega conforme necessário
        const role = response.role;
        if (role === 'ADMIN') {
          this.router.navigate(['/administrador']);
        } else {
          this.router.navigate(['Catalogo']);
        }
  
        // Exibe a mensagem de sucesso usando o serviço de toast
        this.toastService.success("Login realizado com sucesso!");
      },
      error: () => {
        // Exibe a mensagem de erro se o login falhar
        this.toastService.error("Credenciais inválidas. Tente novamente.");
      }
    });
  }

  navigate() {
    this.router.navigate(["Cadastro"])
  }
}