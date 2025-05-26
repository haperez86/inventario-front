import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss'],
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
  ],
})
export class ListaUsuarioComponent {
  @Output() usuariosActualizados = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;
  sidebarVisible = false;
  usuarios: Usuario[] = [];
  cargos: string[] = [];
  usuarioEditar: any = null;
  loading: unknown;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(1)]],
      cargo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarUsuariosYCargos();
  }

  cargarUsuariosYCargos() {
    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
      const cargosSet = new Set(usuarios.map(u => u.cargo));
      this.cargos = Array.from(cargosSet);
    });
  }

  mostrarSidebar(usuario?: any) {
    this.submitted = false;
    this.usuarioEditar = usuario || null;

    if (usuario) {
      this.form.patchValue(usuario);
    } else {
      this.form.reset();
    }

    this.sidebarVisible = true;
  }

  cerrarSidebar() {
    this.sidebarVisible = false;
  }

  cancelar() {
    this.cerrarSidebar();
  }

  guardar() {
    this.submitted = true;
    if (this.form.invalid) return;

    const usuarioData = this.form.value;

    this.usuarioService.crear(usuarioData).subscribe({
      next: (nuevoUsuario) => {
        alert('Usuario creado exitosamente');
        this.usuarios = [...this.usuarios, nuevoUsuario]; // Actualiza la tabla
        this.sidebarVisible = false;
        this.form.reset();
        this.submitted = false;

        this.usuariosActualizados.emit(); // Avisar al componente padre
      },
      error: (err) => {
        alert('Error al crear el usuario');
        console.error(err);
      }
    });
  }
}
