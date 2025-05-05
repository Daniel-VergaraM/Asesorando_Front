import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfesorDetail } from '../profesorDetail';
import { ProfesorService } from '../profesor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrlPipe } from '../../shared/pipes/safe-resource-url.pipe';

@Component({
  selector: 'app-profesor-detail',
  templateUrl: './profesor-detail.component.html',
  styleUrls: ['./profesor-detail.component.css'],
  imports: [CommonModule, FormsModule, SafeResourceUrlPipe]
})
export class ProfesorDetailComponent implements OnInit {
  @Input() profesorId!: number;
  profesor!: ProfesorDetail;
  showEditForm: boolean = false;
  userId: number | null = null;
  userRole: string | null = null;
  isProfesor: boolean = false;
  profesorLoaded: boolean = false;
  loginMessage: string = '';

  @Output() goBack = new EventEmitter<void>();

  constructor(
    private profesorService: ProfesorService
  ) {}

  ngOnInit() {
    if (this.profesorId) {
      this.getProfesorDetail();
      this.checkUserSession();
    }
  }

  checkUserSession(): void {
    // Check for user session in localStorage
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      try {
        const parsedInfo = JSON.parse(userInfo);
        this.userId = Number(parsedInfo.id);
        this.userRole = parsedInfo.tipo;
        this.isProfesor = this.userRole === 'PROFESOR' ||
                          this.userRole === 'PROFESORVIRTUAL' ||
                          this.userRole === 'PROFESORPRESENCIAL';

        if (this.canEditProfile()) {
          console.log('User can edit this profile');
        }
      } catch (e) {
        console.error('Error parsing userInfo from localStorage:', e);
        this.loginMessage = 'Error al cargar la información de usuario.';
      }
    } else {
      console.log('No user session found in localStorage');
      this.loginMessage = 'Inicia sesión como profesor para editar tu perfil.';
    }
  }

  getProfesorDetail(): void {
    this.profesorService.getProfesorDetail(this.profesorId).subscribe({
      next: (profesor) => {
        this.profesor = profesor;
        this.profesorLoaded = true;

        // Debug: Check what's coming back from the API
        console.log('Profesor loaded:', profesor);
        console.log('Experience field value:', profesor.experiencia);

        // Check if experience is coming under a different property name
        const profesorObj = profesor as any;
        if (!profesor.experiencia && profesorObj.experiencia) {
          console.log('Found experience under "experiencia" property instead!');
          this.profesor.experiencia = profesorObj.experiencia;
        }
      },
      error: (err) => {
        console.error('Error fetching profesor details:', err);
      }
    });
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  saveChanges(updatedProfesor: ProfesorDetail): void {
    // Create a deep copy to avoid modifying the form-bound object
    const profesorToUpdate = {
      ...updatedProfesor,
      // Ensure we keep the tematicas array
      tematicas: [...(updatedProfesor.tematicas || [])]
    };

    // Preserve the ID, type, and password when updating
    profesorToUpdate.id = this.profesor.id;
    profesorToUpdate.tipo = this.profesor.tipo;

    // Make sure the password is included (backend might require it)
    if (!profesorToUpdate.contrasena && this.profesor.contrasena) {
      profesorToUpdate.contrasena = this.profesor.contrasena;
    }

    // Debug: Check the experience field before sending
    console.log('Experience before update:', profesorToUpdate.experiencia);

    // Handle API expecting 'experiencia' vs 'experiencia'
    const profesorApiObj = profesorToUpdate as any;
    if (profesorToUpdate.experiencia && !profesorApiObj.experiencia) {
      profesorApiObj.experiencia = profesorToUpdate.experiencia;
    }

    // Convert empty strings to null for optional fields
    ['fotoUrl', 'videoUrl', 'enlaceReunion', 'codigoPostal', 'latitud', 'longitud'].forEach(field => {
      if (profesorToUpdate[field as keyof ProfesorDetail] === '') {
        (profesorToUpdate as any)[field] = null;
      }
    });

    console.log('Saving profesor changes:', profesorToUpdate);

    this.profesorService.updateProfesor(profesorToUpdate).subscribe({
      next: (profesor) => {
        console.log('Professor updated successfully:', profesor);
        // Cast to ProfesorDetail since the API returns Profesor
        this.profesor = profesor as ProfesorDetail;

        // Make sure tematicas array is preserved
        if (!this.profesor.tematicas && profesorToUpdate.tematicas) {
          this.profesor.tematicas = profesorToUpdate.tematicas;
        }

        // Debug: Check if experience field is in the response
        console.log('Experience after update:', this.profesor.experiencia);
        const profesorObj = profesor as any;
        if (!this.profesor.experiencia && profesorObj.experiencia) {
          console.log('Found experience under "experiencia" property in response!');
          this.profesor.experiencia = profesorObj.experiencia;
        }

        this.showEditForm = false;
        // Update localStorage with the new professor data
        this.updateLocalStorage(profesor);
        // Show success message
        alert('Perfil actualizado con éxito');
      },
      error: (err) => {
        console.error('Error updating profesor:', err);
        let errorMsg = 'Error al actualizar el perfil';

        if (err.error && err.error.message) {
          errorMsg += `: ${err.error.message}`;
        } else if (err.status === 0) {
          errorMsg += '. No se pudo conectar con el servidor. Verifica tu conexión.';
        } else {
          errorMsg += `. Código de error: ${err.status}`;
        }

        // Log the request payload that caused the error
        console.error('Request payload that caused error:', profesorToUpdate);

        alert(errorMsg);
      }
    });
  }

  updateLocalStorage(updatedProfesor: any): void {
    // Only update localStorage if the current user is the professor being updated
    if (this.canEditProfile()) {
      try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          const parsedInfo = JSON.parse(userInfo);
          // Update relevant fields while preserving other user data
          parsedInfo.nombre = updatedProfesor.nombre;
          parsedInfo.correo = updatedProfesor.correo;
          parsedInfo.telefono = updatedProfesor.telefono;
          localStorage.setItem('userInfo', JSON.stringify(parsedInfo));
        }
      } catch (e) {
        console.error('Error updating localStorage:', e);
      }
    }
  }

  cancelEdit(): void {
    this.showEditForm = false;
  }

  canEditProfile(): boolean {
    // Only the profesor can edit their own profile
    return this.isProfesor && this.userId === this.profesorId;
  }

  // For testing purposes - create a mock session for this professor
  mockProfesorSession(): void {
    if (this.profesor && this.profesorLoaded) {
      const mockUserInfo = {
        id: this.profesor.id,
        tipo: this.profesor.tipo,
        nombre: this.profesor.nombre,
        correo: this.profesor.correo
      };
      localStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      this.checkUserSession();
      alert('Sesión de prueba creada. Ahora puedes editar este perfil.');
    }
  }

  // For testing purposes - clear the mock session
  clearSession(): void {
    localStorage.removeItem('userInfo');
    this.userId = null;
    this.userRole = null;
    this.isProfesor = false;
    alert('Sesión cerrada.');
    this.checkUserSession();
  }

  navigateBack(): void {
    this.goBack.emit();
  }
}
