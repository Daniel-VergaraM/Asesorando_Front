import { mount } from 'cypress/angular';
import { AsesoriaUpdateComponent } from './asesoria-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService } from '../asesoria.service';

describe('AsesoriaUpdateComponent', () => {
  const profesorId = 1;
  const asesoriaId = 10;

  const asesoriaMock = {
    id: asesoriaId,
    area: 'Matemáticas',
    tematica: 'Álgebra',
    tipo: 'Virtual',
    duracion: '60',
    completada: false,
    profesorId: profesorId
  };

  it('debe cargar los datos de la asesoría y permitir actualizarlos', () => {
    const updateSpy = cy.stub().as('updateAsesoriaSpy').returns(of({}));
    const navigateSpy = cy.stub();

    mount(AsesoriaUpdateComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) =>
                key === 'id' ? String(asesoriaId) :
                key === 'profesorId' ? String(profesorId) : null
            })
          }
        },
        {
          provide: AsesoriaService,
          useValue: {
            getAsesoria: () => of(asesoriaMock),
            getAsesoriasByProfesor: () => of([]),
            updateAsesoria: updateSpy
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: navigateSpy
          }
        }
      ]
    });

    cy.get('input#area').should('have.value', 'Matemáticas');
    cy.get('input#tematica').should('have.value', 'Álgebra');
    cy.get('input#tipo').should('have.value', 'Virtual');
    cy.get('input#duracion').should('have.value', '60');
    cy.get('input#completada').should('not.be.checked');

    cy.get('input#area').clear().type('Física');
    cy.get('input#tematica').clear().type('Mecánica');
    cy.get('input#tipo').clear().type('Presencial');
    cy.get('input#duracion').clear().type('90');
    cy.get('input#completada').check();

    cy.get('button[type="submit"]').click();

    cy.get('@updateAsesoriaSpy').should(function (spy: any) {
      const [args] = spy.args[0];
      console.log(' Argumentos recibidos en updateAsesoria:', args);

      expect(args).to.include({
        area: 'Física',
        tematica: 'Mecánica',
        tipo: 'Presencial',
        completada: true
      });
      expect(args.duracion).to.equal(90);
      expect(args.id).to.equal(asesoriaId);
      expect(args.profesorId).to.equal(profesorId);
    });

    cy.wrap(navigateSpy).should('have.been.calledWith', [`/profesor/home`, profesorId]);
  });
});
