import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../Models/produto.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private apiUrl = 'http://localhost:8080/catalogo';

  constructor(private http: HttpClient) {}

  getCatalogo(): Observable<Produto[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Produto[]>(this.apiUrl, { headers });
  }
}

