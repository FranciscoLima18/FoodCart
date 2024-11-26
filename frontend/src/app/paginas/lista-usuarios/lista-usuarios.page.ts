import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { CRUDUsuariosService } from '../../servicios/crud-usuarios.service';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioRegister } from '../../interfaces/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  standalone: true,
  imports: [NavbarComponent, NgFor, NgIf],
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  usuarios = signal<UsuarioRegister[]>([]);
  usuariosFiltrados = signal<UsuarioRegister[]>([]);
  isadmin: boolean = false;
  authservice: AuthService = inject(AuthService);
  getUsuarios: CRUDUsuariosService = inject(CRUDUsuariosService);
  constructor() {}

  ngOnInit(): void {
    this.isadmin = this.authservice.isAdmin();
  }

  async cargarUsuarios() {
    let usuariossinfiltrar = await this.getUsuarios.getAllUsers();
    usuariossinfiltrar = usuariossinfiltrar.map(
      (usuario: UsuarioRegister, index: number) => {
        return { ...usuario, nombre: 'Usuario número: ' + index };
      },
    );
  }

  actualizarFiltroDeUsuarios(searchValue: string) {
    const filtrados = this.usuarios().filter((usuario: UsuarioRegister) =>
      usuario.nombre.toLowerCase().includes(searchValue.toLowerCase()),
    );
    this.usuariosFiltrados.set(filtrados);
  }
}
