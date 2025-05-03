import { Component, OnInit }       from '@angular/core';
import { UsuarioService }          from '../usuario.service';
import { Usuario }                 from '../usuario';
import { UsuarioDetail }           from '../usuarioDetail';
import { Router }                  from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  users: Usuario[] = [];
  selectedUser: UsuarioDetail | null = null;  

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: data => this.users = data,
      error: err  => console.error('Error al cargar usuarios:', err)
    });
  }

  updateUsuario(id: number): void {
    this.router.navigate(['/usuarios', 'update', id]).then(() => {
      console.log('Ruta actual:', this.router.url);
    });
  }

  seleccionarUsuario(u: Usuario): void {
    this.usuarioService.getUsuarioDetail(u.id).subscribe({
      next: detalle => this.selectedUser = detalle,
      error: err      => console.error(err)
    });
  }

  cerrarDetalle(): void {
    this.selectedUser = null;
  }
}
