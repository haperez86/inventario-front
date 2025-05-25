import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() mercanciaEditar?: Mercancia;  // mercancia a editar (opcional)
  @Input() sidebarVisible: boolean = false;  // controlar visibilidad desde afuera
  @Output() sidebarVisibleChange = new EventEmitter<boolean>(); // para cerrar sidebar

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
  

  guardar() {
    this.submitted = true;

    if (this.form.valid) {
      const formValue = { ...this.form.value };
      formValue.usuarioRegistroId = formValue.usuarioRegistroId?.id;

      this.mercanciaService.crear(formValue).subscribe({
        next: () => {
          alert('Mercancía registrada correctamente');
          this.form.reset();
          this.sidebarVisible = false;
          this.submitted = false;

          // Aquí notificas que la mercancía se actualizó
          this.mercanciaService.notifyMercanciaActualizada();
        },
        error: (err) => {
          alert('Error: ' + err.error);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  
  mostrarSidebar() {
    this.sidebarVisible = true;
    this.form.reset();
    this.submitted = false;
  }

  cancelar() {
    this.sidebarVisible = false;
    this.form.reset();
    this.submitted = false;
  }

}

