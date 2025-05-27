import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from '../comentario.service';
import { Comentario } from '../comentario';

@Component({
  standalone: false,  
  selector: 'app-comentario-create',
  templateUrl: './comentario-create.component.html',
  styleUrl: './comentario-create.component.css'
})
export class ComentarioCreateComponent implements OnInit {
  comentarioForm!: FormGroup;
  estudianteId!: number;
    
  @Input() idReserva!: number;
  @Output() comentarioCreado = new EventEmitter<Comentario>();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estudianteId = Number(this.route.snapshot.paramMap.get('id'));
    this.idReserva = Number(this.route.snapshot.paramMap.get('idReserva')); 

// Puedes usar idAsesoria para lo que necesites, por ejemplo:
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', [Validators.required, Validators.maxLength(500)]],
      calificacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  
  createComentario(): void {
  if (this.comentarioForm.invalid) return;

  const comentario: Comentario = {
    comentario: this.comentarioForm.value.comentario, 
    calificacion: this.comentarioForm.value.calificacion
    };

  console.log('Creando y asociando comentario:', comentario);

  this.comentarioService.createComentarioYAsociar(this.idReserva, comentario).subscribe({
    next: (comentarioCreado) => {
      this.comentarioCreado.emit(comentarioCreado);
      // No navegues ni cierres aquí, eso lo controla el padre
    },
    error: (err: any) => console.error('Error al crear y asociar comentario:', err)
  });
}


cancelCreation(): void {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/estudiante/home', this.estudianteId]);
});}
  
}
