import { Component, OnInit } from '@angular/core';
import { RouterModule }      from '@angular/router';

@Component({
  selector: 'app-home-estudiante',
  standalone: false,    
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css'],
})
export class HomeEstudianteComponent implements OnInit {
  estudianteId!: number;
  usuarioNombre = '';

  ngOnInit() {
    const u = localStorage.getItem('userInfo');
    if (u) {
      const usr = JSON.parse(u);
      this.estudianteId   = usr.id;
      this.usuarioNombre = usr.nombre;
    }
  }
}
