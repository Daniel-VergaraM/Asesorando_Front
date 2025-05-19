import { Component, OnInit }          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService }              from 'ngx-toastr';
import { Router, ActivatedRoute }     from '@angular/router';
import { Asesoria }                   from '../asesoria';
import { AsesoriaService }            from '../asesoria.service';

@Component({
  standalone: false,
  selector: 'app-asesoria-create',
  templateUrl: './asesoria-create.component.html',
  styleUrls: ['./asesoria-create.component.css']
})
export class AsesoriaCreateComponent implements OnInit {
  asesoriaForm!: FormGroup;
  private profesorId!: number;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private asesoriaService: AsesoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1) Recuperar el profesorId de la URL
    this.profesorId = +this.route.snapshot.paramMap.get('profesorId')!;
    // 2) Inicializar el formulario, con profesorId oculto
    this.asesoriaForm = this.fb.group({
      duracion:   ['', Validators.required],
      tematica:   ['', Validators.required],
      tipo:       ['', Validators.required],
      area:       ['', Validators.required],
      completada: [false],
      profesorId: [this.profesorId, Validators.required]
    });
  }

  get f() { return this.asesoriaForm.controls; }

  createAsesoria(): void {
    if (this.asesoriaForm.invalid) { return; }

    const f = this.asesoriaForm.controls;
    const payload = new Asesoria(
      0,                         // id provisional
      f['duracion'].value,       // string
      f['tematica'].value,       // string
      f['tipo'].value,           // string
      f['area'].value,           // string
      f['completada'].value,     // boolean
      this.profesorId            // number
    );

    console.log('Payload Asesoria ➡️', payload);

    this.asesoriaService.createAsesoria(payload).subscribe({
      next: () => {
        this.toastr.success('Asesoría creada correctamente', 'OK');
        // redirige al listado de asesorías de este profesor
        this.router.navigate(['/profesores', this.profesorId, 'asesorias']);
      },
      error: err => {
        console.error('Error al crear asesoría', err);
        this.toastr.error('No se pudo crear la asesoría', 'Error');
      }
    });
  }

  cancelCreation(): void {
    this.toastr.warning('Creación cancelada', 'Asesoría');
    this.asesoriaForm.reset({
      duracion: '', tematica: '', tipo: '', area: '',
      completada: false, profesorId: this.profesorId
    });
  }
}
