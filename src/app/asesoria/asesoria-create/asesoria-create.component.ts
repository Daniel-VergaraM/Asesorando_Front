import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Asesoria } from '../asesoria';
import { AsesoriaService } from '../asesoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asesoria-create',
  templateUrl: './asesoria-create.component.html',
  styleUrls: ['./asesoria-create.component.css']
})
export class AsesoriaCreateComponent implements OnInit {
  asesoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private asesoriaService: AsesoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const profesorId = /* aquí obtén el id del profesor logueado */;
    this.asesoriaForm = this.fb.group({
      duracion: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      area: ['', Validators.required],
      completada: [false],
      profesorId: [profesorId, Validators.required]
    });
  }

  createAsesoria(form: any): void {
    if (this.asesoriaForm.invalid) return;

    const nueva = new Asesoria(
      0,
      form.duracion,
      form.tematica,
      form.tipo,
      form.area,
      form.completada,
      form.profesorId
    );
    this.asesoriaService.createAsesoria(nueva).subscribe({
      next: () => {
        this.toastr.success('Asesoría creada', 'Éxito');
        this.router.navigate(['/asesorias/list']);
      },
      error: err => {
        console.error(err);
        this.toastr.error('Error al crear', 'Error');
      }
    });
  }

  cancelCreation(): void {
    this.toastr.warning('Creación cancelada', 'Asesoría');
    this.asesoriaForm.reset();
  }
}
