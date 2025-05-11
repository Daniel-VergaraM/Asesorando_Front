import { Component }       from '@angular/core';
import { Router }          from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  constructor(private router: Router) {}

  onEditRequested(id: number) {
    // esto lanza la navegación a /usuarios/actualizar/:id
    this.router.navigate(['/usuarios/actualizar', id]);
  }

  onCancelEdit() {
    // opcional: volver a la lista
    this.router.navigate(['/usuarios']);
  }

  onLoginSuccess(user: any) {
    // tu lógica de login…
  }
}
