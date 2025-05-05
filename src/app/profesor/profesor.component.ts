import { Component} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  standalone: true,
  imports: [CommonModule, ProfesorCreateComponent, ProfesorListComponent]
})
export class ProfesorComponent {}
