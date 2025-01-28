import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ChangeDetectorRef } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  infoUsuario = {
    cpf: '',
    name: '',
    email: '',
    telefone: '',
  };

  constructor(private router: Router, private cdr: ChangeDetectorRef, private perfilService: PerfilService ) {}

  ngOnInit(): void {
    this.InfoDoUsuario();
  }

  InfoDoUsuario() {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.infoUsuario = {
        name: decoded.name,
        cpf: decoded.cpf,
        email: decoded.email,
        telefone: decoded.telefone,
      };
      this.cdr.detectChanges();
    }
  }

  navigateVoltar() {
    this.router.navigate(["Catalogo"])
  }
}
