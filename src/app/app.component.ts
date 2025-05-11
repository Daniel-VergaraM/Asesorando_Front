import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']   // ← aquí
})
export class AppComponent {
  title = 'Asesorando';
  searchTerm: string = '';

  onSearch(): void {
    console.log('Buscando:', this.searchTerm);

  }

}
