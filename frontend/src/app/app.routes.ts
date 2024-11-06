import { Routes } from '@angular/router';
import { LoginPage } from './paginas/login/login.page';
import { RegistroUsuarioPage } from './paginas/registro-usuario/registro-usuario.page';
import { InicioPage } from './paginas/inicio/inicio.page';
import { BebidasPage } from './paginas/bebidas/bebidas.page';
import { ComidasPage } from './paginas/comidas/comidas.page';
import { AboutUsPage } from './paginas/about-us/about-us.page';
import { checkTokenGuard } from './guardia/check-token.guard';
import { PostProductoPage } from './paginas/post-producto/post-producto.page';
import { checkAdminGuard } from './guardia/check-admin.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPage,
    title: 'Login',
  },
  {
    path: 'registro',
    component: RegistroUsuarioPage,
    title: 'Registro',
  },
  {
    path: '',
    component: InicioPage,
    title: 'Inicio',
    canActivate: [checkTokenGuard],
  },
  {
    path: 'bebidas',
    component: BebidasPage,
    title: 'Bebidas',
    canActivate: [checkTokenGuard],
  },
  {
    path: 'comidas',
    component: ComidasPage,
    title: 'Comidas',
    canActivate: [checkTokenGuard],
  },
  {
    path: 'aboutUs',
    component: AboutUsPage,
    title: 'About Us',
    canActivate: [checkTokenGuard],
  },
  {
    path: 'productos/ingresar',
    component: PostProductoPage,
    title: 'Ingresar Producto',
    canActivate: [checkAdminGuard],
  },
];
