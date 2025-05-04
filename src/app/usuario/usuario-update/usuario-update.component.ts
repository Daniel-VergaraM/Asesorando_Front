import {Component, Input, Output,OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService }                    from '../usuario.service';
import { Usuario }                           from '../usuario';

@Component({
  standalone: false,
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioActualizarComponent implements OnChanges {
  @Input()  userId: number | null = null;
  @Output() cancel = new EventEmitter<void>();

  usuarioForm!: FormGroup;
  private userOriginal!: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      nombre:     ['', Validators.required],
      correo:     ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono:   ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId != null) {
      this.usuarioService.getUsuarioById(this.userId).subscribe({
        next: u => {
          this.userOriginal = u;
          this.usuarioForm.patchValue(u);
        },
        error: err => console.error('Error al cargar usuario:', err)
      });
    }
  }

  onSubmitUpdate(): void {
    if (!this.userOriginal) return;
    const payload: Usuario = {
      ...this.userOriginal,
      ...this.usuarioForm.value
    };
    this.usuarioService.actualizarUsuario(payload).subscribe({
      next: () => {
        console.log('Usuario actualizado:', payload);
        this.cancel.emit();
        window.location.reload();},
      error: err => console.error('Error al actualizar:', err)
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
