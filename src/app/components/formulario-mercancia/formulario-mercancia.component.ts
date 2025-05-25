import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { MercanciaService } from '../../services/mercancia.service';
import { Mercancia } from '../../models/mercancia.model';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-formulario-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    SidebarModule 
  ],
  templateUrl: './formulario-mercancia.component.html',
  styleUrls: ['./formulario-mercancia.component.scss']
})
export class FormularioMercanciaComponent {

  @Input() mercanciaEditar: Mercancia | null | undefined;
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();

  form: FormGroup;
  usuarios: Usuario[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private mercanciaService: MercanciaService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      fechaIngreso: [null, Validators.required],
      usuarioRegistroId: [null, Validators.required]
    });

    this.usuarioService.listar().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['mercanciaEditar']) {
        if (this.mercanciaEditar) {
          // EDITAR: cargar datos
          this.form.patchValue({
            nombre: this.mercanciaEditar.nombre,
            cantidad: this.mercanciaEditar.cantidad,
            fechaIngreso: new Date(this.mercanciaEditar.fechaIngreso),
            usuarioRegistroId: this.usuarios.find(u => u.id === this.mercanciaEditar?.usuarioRegistroId) || null
          });
        } else {
          // CREAR NUEVO: limpiar formulario
          this.form.reset();
        }
        this.submitted = false;
      }

      if (changes['sidebarVisible'] && changes['sidebarVisible'].currentValue === false) {
        // Cerrar: limpiar
        this.form.reset();
        this.submitted = false;
      }
    }
  

  guardar() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formValue = { ...this.form.value };

    // Formatear fechaIngreso a 'yyyy-MM-dd'
    if (formValue.fechaIngreso) {
      if (typeof formValue.fechaIngreso === 'string') {
        formValue.fechaIngreso = formValue.fechaIngreso.split('T')[0];
      } else if (formValue.fechaIngreso instanceof Date) {
        const d = formValue.fechaIngreso;
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        formValue.fechaIngreso = `${year}-${month}-${day}`;
      }
    }

    if (this.mercanciaEditar?.id) {
      // En edición enviamos usuarioModificacionId, no usuarioRegistroId
      formValue.usuarioModificacionId = 2; // Aquí pon el id real del usuario que modifica
      delete formValue.usuarioRegistroId;

      this.mercanciaService.editar(this.mercanciaEditar.id, formValue).subscribe({
        next: () => {
          alert('Mercancía actualizada correctamente');
          this.sidebarVisibleChange.emit(false);
          this.mercanciaService.notifyMercanciaActualizada();
        },
        error: (err) => alert('Error al actualizar: ' + err.error)
      });

    } else {
      // En creación enviamos usuarioRegistroId
      formValue.usuarioRegistroId = 2; // Aquí pon el id real del usuario que registra

      this.mercanciaService.crear(formValue).subscribe({
        next: () => {
          alert('Mercancía registrada correctamente');
          this.sidebarVisibleChange.emit(false);
          this.mercanciaService.notifyMercanciaActualizada();
        },
        error: (err) => alert('Error al crear: ' + err.error)
      });
    }
  }

  
  mostrarSidebar() {
    this.sidebarVisible = true;
    this.form.reset();
    this.submitted = false;
  }

  editarMercancia(mercancia: Mercancia) {
    this.mercanciaEditar = mercancia;
    this.sidebarVisible = true;
  }

  cancelar() {
    this.sidebarVisibleChange.emit(false);
    this.form.reset();
    this.submitted = false;
  }

}

