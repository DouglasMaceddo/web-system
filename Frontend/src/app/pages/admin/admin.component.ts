import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../Models/produto.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  produtos: Produto[] = [];
  produto: Produto = { id: 0, nome: '', descricao: '', preco: 0, categoria: '', imagemUrl: '', tamanho: '' };

  constructor(private produtoService: ProdutoService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getCatalogo().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }

  addProduto(): void {
    this.produtoService.addProduto(this.produto).subscribe(
      (newProduto) => {
        this.produtos.push(newProduto);
        this.toastr.success('Produto adicionado com sucesso');
        this.produto = { id: 0, nome: '', descricao: '', preco: 0, categoria: '', imagemUrl: '', tamanho: '' }; // Clear form
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
        this.toastr.error('Falha ao adicionar produto');
      }
    );
  }

  updateProduto(produto: Produto): void {
    this.produtoService.updateProduto(produto.id, produto).subscribe(
      (updatedProduto) => {
        const index = this.produtos.findIndex(p => p.id === produto.id);
        this.produtos[index] = updatedProduto;
        this.toastr.success('Produto atualizado com sucesso');
      },
      (error) => {
        console.error('Erro ao atualizar produto:', error);
        this.toastr.error('Falha ao atualizar produto');
      }
    );
  }

  deleteProduto(id: number): void {
    this.produtoService.deleteProduto(id).subscribe(
      () => {
        this.produtos = this.produtos.filter(p => p.id !== id);
        this.toastr.success('Produto removido com sucesso');
      },
      (error) => {
        console.error('Erro ao remover produto:', error);
        this.toastr.error('Falha ao remover produto');
      }
    );
  }
}