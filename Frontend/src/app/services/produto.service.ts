import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../Models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getCatalogo(): Observable<Produto[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get<Produto[]>(this.apiUrl, { headers });
  }

  addProduto(produto: Produto): Observable<Produto> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Produto>(`${this.apiUrl}/addProduto`, produto, { headers });
  }
  

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Produto>(`${this.apiUrl}/updateProduto/${id}`, produto, { headers });
  }

  deleteProduto(id: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/deleteProduto/${id}`, { headers });
  }
}