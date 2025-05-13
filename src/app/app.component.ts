import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']   
})
export class AppComponent  {
  title = 'Asesorando';
  searchTerm: string = '';

  onSearch(): void {
    console.log('Buscando:', this.searchTerm);

  }

  public asesoriasOpen = false;

  toggleAsesorias(): void {
    this.asesoriasOpen = !this.asesoriasOpen;
  }

  closeAsesorias(): void {
    this.asesoriasOpen = false;
  }
}
