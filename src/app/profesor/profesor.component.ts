import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorCreateComponent } from "./profesor-create/profesor-create.component";
import { ProfesorListComponent } from "./profesor-list/profesor-list.component";

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  standalone: true,
  imports: [CommonModule, ProfesorCreateComponent, ProfesorListComponent]
})
export class ProfesorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
