import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }

  signup(cpf: string, name: string, email: string, telefone: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { cpf, name, email, telefone, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    this.router.navigate(['/Login']);
  }

  isAdmin(): boolean {
    const token = sessionStorage.getItem('auth-token');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role === 'admin';
    } catch (e) {
      console.error('Erro ao decodificar o token:', e);
      return false;
    }
  }
}
