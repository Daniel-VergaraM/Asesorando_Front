// src/app/home/home.component.ts
import { Component, OnInit }    from '@angular/core';
import { CommonModule }          from '@angular/common';
import { RouterModule, Router }  from '@angular/router';
import { FormsModule }           from '@angular/forms';
import { ProfesorListComponent } from '../../profesor/profesor-list/profesor-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProfesorListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls:   ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(): void {
    const q = this.searchTerm.trim();
    // Redirige a la lista de profesores con el término de búsqueda en query params
    this.router.navigate(['/profesores'], { queryParams: { q } });
  }
}
