import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Asesoria } from '../asesoria';
import { AsesoriaService } from '../asesoria.service';

@Component({
  selector: 'app-asesoria-create',
  standalone: false,
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
    this.profesorId = +this.route.snapshot.paramMap.get('profesorId')!;
    this.asesoriaForm = this.fb.group({
      duracion: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      area: ['', Validators.required],
      completada: [false],
      profesorId: [this.profesorId, Validators.required]
    });
  }

  get f() { return this.asesoriaForm.controls; }

  createAsesoria(): void {
    if (this.asesoriaForm.invalid) return;

    const f = this.asesoriaForm.controls;
    const payload = new Asesoria(
      0,
      f['duracion'].value,
      f['tematica'].value,
      f['tipo'].value,
      f['area'].value,
      f['completada'].value,
      this.profesorId
    );

    this.asesoriaService.createAsesoria(payload).subscribe({
      next: () => {
        this.toastr.success('Asesoría creada correctamente', 'OK');
        this.router.navigate(['/asesorias', 'profesor', this.profesorId]);
      },
      error: () => {
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