import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService }                         from '../usuario.service';
import { Usuario }                                from '../usuario';
import { UsuarioDetail }                          from '../usuarioDetail';

@Component({
  standalone: false,
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  users: Usuario[] = [];
  selectedUser: UsuarioDetail | null = null;

  @Output() editRequested = new EventEmitter<number>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: data => this.users = data,
      error: err  => console.error('Error al cargar usuarios:', err)
    });
  }

  updateUsuario(id: number): void {
    this.editRequested.emit(id);
  }

  seleccionarUsuario(u: Usuario): void {
    this.usuarioService.getUsuarioDetail(u.id).subscribe({
      next: d => this.selectedUser = d,
      error: err => console.error('Error detalle:', err)
    });
  }

  cerrarDetalle(): void {
    this.selectedUser = null;
  }
}
