import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  constructor(private router: Router) { }


  navigateVoltar() {
    this.router.navigate(["Catalogo"])
  }

}
