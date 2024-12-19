import { Component } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../../Models/produto.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [CatalogoService],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  produtos: Produto [] = [];
  produtosFiltrados: Produto[] = [];
  pesquisa: string = '';
  firstName: string = ''; 

  constructor(private catalogoService: CatalogoService, private loginService: LoginService,private router: Router){}

  ngOnInit(): void {
    this.catalogoService.getCatalogo().subscribe(
      (data: Produto[]) => {
        this.produtos = data; // Preenche os produtos com os dados recebidos do backend
        this.produtosFiltrados = data; // Inicializa os produtos filtrados com todos os produtos
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error); // Exibe erro se a requisição falhar
      }
    );
  }

  filtrarProdutos(): void {
    if (this.pesquisa) {
      this.produtosFiltrados = this.produtos.filter(produto => 
        produto.nome.toLowerCase().includes(this.pesquisa.toLowerCase()) || 
        produto.categoria.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    } else {
      this.produtosFiltrados = this.produtos;
    }
  }
  onLogout(): void {
    this.loginService.logout();
  }
}
