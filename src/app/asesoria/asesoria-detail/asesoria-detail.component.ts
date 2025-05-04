import { Component, OnInit, Input } from '@angular/core';
import { AsesoriaDetail } from '../asesoriaDetail';

@Component({
  selector: 'app-asesoria-detail',
  templateUrl: './asesoria-detail.component.html',
  standalone: false,
  styleUrls: ['./asesoria-detail.component.css']
})
export class AsesoriaDetailComponent implements OnInit {
  @Input() detalle!: AsesoriaDetail;

  ngOnInit(): void {}
}
