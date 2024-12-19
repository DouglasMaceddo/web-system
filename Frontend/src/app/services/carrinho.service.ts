import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Carrinho } from '../Models/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private apiUrl = 'http://localhost:8080/carrinho';
  private carrinhoSubject = new BehaviorSubject<Carrinho>({ id: 0, itens: [], total: 0 });

  constructor(private http: HttpClient) { }

  adicionarProduto(carrinhoId: number, produtoId: number, quantidade: number): Observable<Carrinho> {
    return this.http.post<Carrinho>(`${this.apiUrl}/${carrinhoId}/adicionar/${produtoId}`, null, { params: { quantidade } });
  }

  removerProduto(carrinhoId: number, itemCarrinhoId: number): Observable<Carrinho> {
    return this.http.delete<Carrinho>(`${this.apiUrl}/${carrinhoId}/remover/${itemCarrinhoId}`);
  }

  listarCarrinho(carrinhoId: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.apiUrl}/${carrinhoId}`);
  }

  getCarrinho() {
    return this.carrinhoSubject.asObservable();
  }
}
