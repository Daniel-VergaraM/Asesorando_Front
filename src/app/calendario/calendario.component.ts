import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CalendarioService } from './calendario.service';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  standalone: true,
  imports: [CommonModule, CalendarioListComponent]
})
export class CalendarioComponent implements OnInit {
  userId: number | null = null;
  userRole: string | null = null;
  isProfesor: boolean = false;

  constructor(
    private calendarioService: CalendarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkUserSession();
  }

  checkUserSession(): void {
    // Verificar si hay sesión de usuario en localStorage
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      try {
        const parsedInfo = JSON.parse(userInfo);
        this.userId = Number(parsedInfo.id);
        this.userRole = parsedInfo.tipo;
        this.isProfesor = this.userRole === 'PROFESOR' ||
                          this.userRole === 'PROFESORVIRTUAL' ||
                          this.userRole === 'PROFESORPRESENCIAL';
      } catch (e) {
        console.error('Error al analizar userInfo desde localStorage:', e);
      }
    } else {
      console.log('No se encontró sesión de usuario en localStorage');
    }
  }

  // Para propósitos de testing - crear una sesión de profesor de prueba
  mockProfesorSession(): void {
    const mockUserInfo = {
      id: 1, // ID de ejemplo
      tipo: 'PROFESOR',
      nombre: 'Profesor de Prueba',
      correo: 'profesor@test.com'
    };
    localStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
    this.checkUserSession();
    alert('Sesión de profesor creada. Ahora puedes gestionar tu calendario.');
    window.location.reload();
  }

  // Para propósitos de testing - limpiar la sesión de prueba
  clearSession(): void {
    localStorage.removeItem('userInfo');
    this.userId = null;
    this.userRole = null;
    this.isProfesor = false;
    alert('Sesión cerrada.');
    this.checkUserSession();
    window.location.reload();
  }
}
