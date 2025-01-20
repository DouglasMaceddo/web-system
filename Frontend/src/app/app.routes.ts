import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { AdminComponent } from './admin/admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "Login",
        component: LoginComponent
    },
    {
        path: "Cadastro",
        component: SignUpComponent
    },
    {
        path: "Catalogo",
        component: CatalogoComponent
    },
    {
        path: "Carrinho",
        component: CarrinhoComponent
    },
    {
        path: "Administrador",
        component: AdminComponent
    },
    {
        path: "Perfil",
        component: PerfilComponent

    }

];
