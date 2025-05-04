import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComentarioService } from '../comentario.service';
import { Comentario } from '../comentario';

@Component({
  standalone: false,  
  selector: 'app-comentario-create',
  templateUrl: './comentario-create.component.html',
})
export class ComentarioCreateComponent implements OnInit {
  comentarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comentarioForm = this.formBuilder.group({
      texto: ['', [Validators.required, Validators.maxLength(500)]],
      calificacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      idAsesoria: [null, Validators.required]
    });
  }

  createComentario(): void {
    if (this.comentarioForm.invalid) return;

    const comentario: Comentario = this.comentarioForm.value;

    console.log('Comentario a crear:', comentario);
    this.comentarioService.createComentario(comentario).subscribe({
      next: () => this.router.navigate(['/asesorias']),
      error: (err: any) => console.error('Error al crear comentario:', err)
    });
  }

  cancelCreation(): void {
    this.router.navigate(['/asesorias']);
  }
}
