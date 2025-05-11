/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesoriaCreateComponent } from './asesoria-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AsesoriaService } from '../asesoria.service';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('AsesoriaCreateComponent', () => {
  let component: AsesoriaCreateComponent;
  let fixture: ComponentFixture<AsesoriaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      declarations: [AsesoriaCreateComponent],
      providers: [AsesoriaService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  ['duracion','tematica','tipo','area','completada'].forEach(field => {
    it(`tiene control ${field}`, () => {
      const el = fixture.debugElement.query(By.css(`#${field}`));
      expect(el).toBeTruthy();
    });
  });

  it('botón submit deshabilitado si el form es inválido', () => {
    component.asesoriaForm.controls['duracion'].setValue('');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#submit'));
    expect(btn.nativeElement.disabled).toBeTrue();
  });
});
