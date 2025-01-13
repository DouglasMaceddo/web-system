import { Component } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../../Models/produto.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [CatalogoService],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  pesquisa: string = '';
  categoriaSelecionada: String = '';
  carrinhoId: number = 0;
  quantidade: { [key: number]: number } = {};
  isAdmin: boolean = false

  constructor(private catalogoService: CatalogoService, private carrinhoService: CarrinhoService,
    private loginService: LoginService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    this.catalogoService.getCatalogo().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
        this.produtosFiltrados = data;
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.categoria.toLowerCase() === categoria.toLowerCase()
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

  adicionarprodutos() {
    this.router.navigate(["Administrador"])
  }

  navigateCarrinho() {
    this.router.navigate(["Carrinho"])
  }
}
