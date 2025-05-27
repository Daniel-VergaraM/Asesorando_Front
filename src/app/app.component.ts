import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']   
})
export class AppComponent implements OnInit {
  title = 'Asesorando';
  searchTerm: string = '';
  public currentUrl: string = '';
  public asesoriasOpen = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    // Nos suscribimos a los cambios de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  onSearch(): void {
    console.log('Buscando:', this.searchTerm);

  }

  toggleAsesorias(): void {
    this.asesoriasOpen = !this.asesoriasOpen;
  }

  closeAsesorias(): void {
    this.asesoriasOpen = false;
  }

  logout(): void {
    // Lógica de logout (p.ej. limpiar token, llamar servicio, etc.)
    console.log('Cerrando sesión');
    this.router.navigate(['/']);
  }
}
