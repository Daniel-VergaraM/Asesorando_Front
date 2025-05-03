import { Component, OnInit } from '@angular/core';
import { UsuarioService }    from '../usuario.service';
import { Usuario }           from '../usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-list',
  standalone: false,
  templateUrl: './usuario-list.component.html',
  styleUrls:   ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  /* … */

  users: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

private loadUsers(): void {
  this.usuarioService.getUsuarios().subscribe({
    next: data => {
      console.log('Usuarios del backend:', data);
      this.users = data;
    },
    error: err => console.error('Error al cargar usuarios:', err)
  });
}

  

  seleccionarUsuario(usuario: Usuario): void {
    alert(`Usuario: ${usuario.nombre}\nCorreo: ${usuario.correo}`);
  }

  updateUsuario(id: number) {
    this.router.navigate(['/usuarios', 'update', id]).then(() => {
      console.log('Ruta actual:', this.router.url);
    });
}}
