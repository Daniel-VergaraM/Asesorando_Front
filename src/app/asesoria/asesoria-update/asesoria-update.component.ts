import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService } from '../asesoria.service';
import { Asesoria } from '../asesoria';
import { AsesoriaDetail } from '../asesoriaDetail';

@Component({
  selector: 'app-asesoria-update',
  standalone: false,
  templateUrl: './asesoria-update.component.html',
  styleUrls: ['./asesoria-update.component.css']
})
export class AsesoriaUpdateComponent implements OnInit {
  asesoriaId!: number;
  asesoriaForm!: FormGroup;
  private asesoriaOriginal!: AsesoriaDetail;

  constructor(
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.asesoriaId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();

    this.asesoriaService.getAsesoria(this.asesoriaId)
      .subscribe(asesoria => {
        this.asesoriaOriginal = asesoria;
        this.asesoriaForm.patchValue(asesoria);
      });
  }

  private buildForm() {
    this.asesoriaForm = this.fb.group({
      completada:   [false],
      calendarioId: [null, Validators.required],
      profesorId:   [null, Validators.required],
      reservaId:    [null, Validators.required],
      usuarioId:    [null, Validators.required],
      area:         ['', Validators.required],
      duracion:     [0, [Validators.required, Validators.min(1)]],
      tematica:     ['', Validators.required],
      tipo:         ['', Validators.required]
    });
  }

  onSubmitUpdate(): void {
    if (this.asesoriaForm.invalid) return;

    const payload: Asesoria = {
      ...this.asesoriaOriginal,
      ...this.asesoriaForm.value
    };

    console.log('▶️ Payload a enviar:', payload);

    this.asesoriaService.updateAsesoria(payload)
      .subscribe({
        next: () => this.router.navigate(['/asesorias']),
        error: err => console.error('❌ Error al actualizar:', err)
      });
  }

  onCancel(): void {
    this.router.navigate(['/asesorias']);
  }
}
