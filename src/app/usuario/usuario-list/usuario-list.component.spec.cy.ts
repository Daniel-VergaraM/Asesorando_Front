import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { faker } from '@faker-js/faker';

import { UsuarioListComponent } from './usuario-list.component';
import { Usuario } from '../usuario';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [UsuarioListComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    // Generar lista de usuarios de prueba incluyendo tipo y contrasena
    const testUsers: Usuario[] = [];
    const tipos = ['ESTUDIANTE', 'PROFESOR'];
    for (let i = 0; i < 3; i++) {
      testUsers.push({
        id: i + 1,
        nombre: faker.name.fullName(),
        correo: faker.internet.email(),
        telefono: faker.phone.number(),
        tipo: tipos[i % tipos.length],
        contrasena: faker.internet.password()
      });
    }
    component.users = testUsers;

    fixture.detectChanges();
  });

  it('crea la lista', () => {
    expect(component).to.exist;
  });

  it('genera 3 cards', () => {
    const cards = debug.queryAll(By.css('div.col-auto.mb-4'));
    expect(cards.length).to.equal(3);
  });

  it('renderiza campos basicos de usuario', () => {
    const cards = debug.queryAll(By.css('div.card-body'));
    cards.forEach((card, index) => {
      const text = card.nativeElement.textContent;
      expect(text).to.contain(component.users[index].nombre);
      expect(text).to.contain(component.users[index].correo);
      expect(text).to.contain(component.users[index].telefono);
    });
  });
});

