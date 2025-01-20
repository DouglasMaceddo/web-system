import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface SignupForm {
  cpf: FormControl,
  name: FormControl,
  email: FormControl,
  telefone: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(private router: Router,private loginService: LoginService,private toastService: ToastrService) {
    this.signupForm = new FormGroup({
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/), this.ValidatorCPF.bind(this)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto: number;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  ValidatorCPF(control: any) {
    const cpf = control.value;
    if (cpf && !this.validarCPF(cpf)) {
      return { cpfInvalido: true };
    }
    return null;
  }

  formatarCpf(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  onCpfChange(event: any): void {
    const formattedCpf = this.formatarCpf(event.target.value);
    this.signupForm.controls['cpf'].setValue(formattedCpf);
  }

  formatarTelefone(telefone: string): string {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length <= 10) {
      return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {

      return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  }

  onTelefoneChange(event: any): void {
    const formattedTelefone = this.formatarTelefone(event.target.value);
    this.signupForm.controls['telefone'].setValue(formattedTelefone);
  }

  submit() {
    this.loginService.signup(this.signupForm.value.cpf, this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.telefone, this.signupForm.value.password).subscribe({
      next: () => this.toastService.success("Cadastro feito com sucesso!"),
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  navigate() {
    this.router.navigate(["Login"])
  }
}
