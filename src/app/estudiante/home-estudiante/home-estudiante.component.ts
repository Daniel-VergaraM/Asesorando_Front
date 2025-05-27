import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstudianteDetail } from '../estudianteDetail';
import { ProfesorDetail } from '../../profesor/profesorDetail';
import { EstudianteService } from '../estudiante.service';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Reserva } from '../../reserva/reserva';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComentarioComponent } from '../../comentario/comentario.component';
import { ReservaService } from '../../reserva/reserva.service';
import { ComentarioModule } from '../../comentario/comentario.module';
import { Subject } from 'rxjs';
import { ComentarioCreateComponent } from '../../comentario/comentario-create/comentario-create.component';
import { Comentario } from '../../comentario/comentario';
import { ProfesorListComponent } from "../../profesor/profesor-list/profesor-list.component";

@Component({
  selector: 'app-home-estudiante',
  standalone: true,
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css'],
  imports: [CommonModule, RouterModule, CalendarModule, ComentarioModule, ProfesorListComponent]
})
export class HomeEstudianteComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: any;
  modalRef!: NgbModalRef;
  refresh: Subject<void> = new Subject<void>();
  reservasPendientes: Reserva[] = [];
  estudiante!: EstudianteDetail;
  usuarioNombre = '';
  profesoresRecomendados: ProfesorDetail[] = [];
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  reservas: Reserva[] = [];
  selectedEvent?: CalendarEvent;
  mostrarFormularioComentario: boolean = false;
  estudianteId!: number;
  idReserva!: number;
  idAsesoria!: number;
  nombreEstudiante: string | undefined;
  mostrarProfesores: boolean = false;


  constructor(private estudianteSvc: EstudianteService, private modalService: NgbModal, 
    private reservaService: ReservaService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    this.cargarDatos(id);
  });

    this.estudianteId = Number(this.route.snapshot.paramMap.get('id'));
    this.idReserva = Number(this.route.snapshot.paramMap.get('idReserva'));

    // Puedes usar idAsesoria para lo que necesites, por ejemplo:
    
    this.cargarReservasPendientes();
    const stored = localStorage.getItem('userInfo');
    if (!stored) return;
    const { id: estudianteId } = JSON.parse(stored);

    this.estudianteSvc.getEstudianteDetail(estudianteId)
      .subscribe(e => {
        this.estudiante = e;
        this.usuarioNombre = e.nombre;
        this.cargarReservas();
        
        if (e.reservas && e.reservas.length > 0) {
          this.reservas = e.reservas;
           this.reservas = e.reservas.filter(reserva => reserva.cancelada === false);

          this.calendarEvents = this.reservas.map((reserva: Reserva) => ({
            
            title: `Reserva: ${reserva.estado}`, // Lo que quieres mostrar
            start: new Date(reserva.fechaReserva),
            end: addHours(new Date(reserva.fechaReserva), 1), // duración 1 hora
            color: { primary: '#28a745', secondary: '#c3e6cb' },
            meta: { reserva } // datos extra para mostrar en el modal
          }));

          this.refresh.next();
        }
      });

      
  }


  cargarReservas() {
  this.estudianteSvc.getEstudianteDetail(this.estudianteId).subscribe(e => {
    this.estudiante = e;
    this.reservas = e.reservas.filter(reserva => reserva.cancelada === false);

    this.calendarEvents = this.reservas.map(reserva => ({
      title: `Reserva: ${reserva.estado}`,
      start: new Date(reserva.fechaReserva),
      end: addHours(new Date(reserva.fechaReserva), 1),
      color: { primary: '#28a745', secondary: '#c3e6cb' },
      meta: { reserva }
    }));
    this.refresh.next();
  });
}

  handleEventClick(event: CalendarEvent): void {
    this.selectedEvent = event;
    this.idAsesoria = event.meta?.reserva?.idAsesoria;
    this.modalRef = this.modalService.open(this.modalContent, { size: 'lg' });
  }

  closeModal(): void {
    this.modalRef?.close();
  }

  cambiarEstadoACompletada(): void {
  if (!this.selectedEvent?.meta?.reserva?.id) {
    alert('ID de reserva no encontrado');
    return;
  }

  const id = this.selectedEvent.meta.reserva.id;

  this.reservaService.cambiarEstadoACompletada(id).subscribe({
    next: () => {
      // Actualizar estado en el objeto seleccionado
      this.selectedEvent!.meta.reserva.estado = 'Completada';
      this.selectedEvent!.title = 'Reserva: Completada';

      this.calendarEvents = this.calendarEvents.map(event => {
        if (event === this.selectedEvent) {
          return {
            ...event,
            title: 'Reserva: Completada',
            meta: {
              ...event.meta,
              reserva: {
                ...event.meta.reserva,
                estado: 'Completada'
              }
            }
          };
        }
        return event;
      });

      this.refresh.next();
      this.mostrarFormularioComentario = true;

      // 🟢 Mensaje de éxito
      alert('Estado de la reserva actualizado exitosamente');
      this.abrirFormularioComentario(this.estudianteId, this.idReserva);
    },
    error: (err) => {
      // 🔴 Mensaje de error
      alert('Error al cambiar el estado de la reserva');
      console.error(err);
    }
  });
}

  abrirFormularioComentario(idEstudiante: number, idReserva: number) {
    if (!idReserva) {
    idReserva = this.selectedEvent?.meta?.reserva?.idAsesoria;
    }
    this.router.navigate([
      'estudiante/home',
      idEstudiante,
      'comentario-create',
      idReserva,
    ]);

    this.mostrarFormularioComentario = true;
  }

  onComentarioCreado(nuevoComentario: Comentario): void {
  // Actualizar el objeto directamente sin volver a llamar al backend
  if (this.selectedEvent && this.selectedEvent.meta?.reserva) {
    this.selectedEvent.meta.reserva.comentario = nuevoComentario;

    // Si también quieres actualizar el evento del calendario
    this.calendarEvents = this.calendarEvents.map(evento => {
      if (evento === this.selectedEvent) {
        return {
          ...evento,
          meta: {
            ...evento.meta,
            reserva: {
              ...evento.meta.reserva,
              comentario: nuevoComentario
            }
          }
        };
      }
      return evento;
    });

    this.refresh.next(); // refresca el calendario si se requiere
  }
  this.cargarReservas();
  this.mostrarFormularioComentario = false;

  // Opcional: mostrar mensaje
  alert('Comentario guardado exitosamente');
}

cargarDatos(id: number) {
  this.estudianteSvc.getEstudianteDetail(id).subscribe(estudiante => {
    console.log('Estudiante cargado:', estudiante);
    this.estudiante = estudiante;
  });
}

  cargarReservasPendientes() {
  this.estudianteSvc.getEstudianteDetail(this.estudianteId).subscribe(e => {
    this.estudiante = e;
    // Filtrar las reservas cuyo estado sea 'noCompletada' (o el que uses para pendiente)
    this.reservasPendientes = e.reservas
      .filter(r => r.estado === 'noCompletada'  && !r.cancelada)
      .sort((a, b) => new Date(a.fechaReserva).getTime() - new Date(b.fechaReserva).getTime());
  });
}


cambiarACancelada(): void {
  if (!this.selectedEvent?.meta?.reserva?.id) {
    alert('ID de reserva no encontrado');
    return;
  }

  const id = this.selectedEvent.meta.reserva.id;

  this.reservaService.cambiarACancelada(id).subscribe({
    next: () => {
      
      this.selectedEvent!.meta.reserva.cancelada = true;
      this.selectedEvent!.title = 'Reserva: Cancelada';

      this.calendarEvents = this.calendarEvents.map(event => {
        if (event === this.selectedEvent) {
          return {
            ...event,
            title: 'Reserva: Cancelada',
            meta: {
              ...event.meta,
              reserva: {
                ...event.meta.reserva,
             cancelada: true
              }
            }
          };
        }
        return event;
      });

       this.refresh.next();
      alert('La reserva fue cancelada exitosamente');
    },
    error: (err) => {
      alert('Error al cancelar la reserva');
      console.error(err);
    }
  });
    
}
  
}
