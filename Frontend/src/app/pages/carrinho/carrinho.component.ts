import { Component } from '@angular/core';

import { CarrinhoService } from '../../services/carrinho.service';
import { OnInit } from '@angular/core';
import { Carrinho } from '../../Models/carrinho.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})

export class CarrinhoComponent implements OnInit {
  carrinho: Carrinho = { id: 0, itens: [], total: 0 };

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoService.getCarrinho().subscribe(carrinho => {
      this.carrinho = carrinho;
    });
  }

  removerProduto(itemCarrinhoId: number): void {
    this.carrinhoService.removerProduto(this.carrinho.id, itemCarrinhoId).subscribe(updatedCarrinho => {
      this.carrinho = updatedCarrinho;
    });
  }

  limparCarrinho(): void {
    this.carrinho.itens = [];
    this.carrinho.total = 0;
  }
}