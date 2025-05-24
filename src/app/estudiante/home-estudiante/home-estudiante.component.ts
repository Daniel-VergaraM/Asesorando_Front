import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstudianteDetail } from '../estudianteDetail';
import { ProfesorDetail } from '../../profesor/profesorDetail';
import { EstudianteService } from '../estudiante.service';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Reserva } from '../../reserva/reserva';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-estudiante',
  standalone: true,
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css'],
  imports: [CommonModule, RouterModule, CalendarModule]
})
export class HomeEstudianteComponent implements OnInit {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  modalRef?: NgbModalRef;

  estudiante!: EstudianteDetail;
  usuarioNombre = '';
  profesoresRecomendados: ProfesorDetail[] = [];
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  reservas: Reserva[] = [];
  selectedEvent?: CalendarEvent;

  constructor(private estudianteSvc: EstudianteService, private modalService: NgbModal) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return;
    const { id: estudianteId } = JSON.parse(stored);

    this.estudianteSvc.getEstudianteDetail(estudianteId)
      .subscribe(e => {
        this.estudiante = e;
        this.usuarioNombre = e.nombre;

        if (e.reservas && e.reservas.length > 0) {
          this.reservas = e.reservas;

          this.calendarEvents = this.reservas.map((reserva: Reserva) => ({
            title: `Reserva: ${reserva.estado}`, // Lo que quieres mostrar
            start: new Date(reserva.fechaReserva),
            end: addHours(new Date(reserva.fechaReserva), 1), // duración 1 hora
            color: { primary: '#28a745', secondary: '#c3e6cb' },
            meta: { reserva } // datos extra para mostrar en el modal
          }));
        }
      });
  }

  handleEventClick(event: CalendarEvent): void {
    this.selectedEvent = event;
    this.modalRef = this.modalService.open(this.modalContent, { size: 'lg' });
  }

  closeModal(): void {
    this.modalRef?.close();
  }
}
