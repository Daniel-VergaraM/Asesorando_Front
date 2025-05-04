import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  editingUserId: number | null = null;

  onEditRequested(id: number) {
    this.editingUserId = id;
  }


  onCancelEdit() {
    this.editingUserId = null;
  }
}
