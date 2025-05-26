import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListaUsuarioComponent } from "../usuario/lista-usuario.component";
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-usuario-selector',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    ListaUsuarioComponent
],
  
  templateUrl: './usuario-selector.component.html',
  styleUrls: ['./usuario-selector.component.scss'],
})
export class UsuarioSelectorComponent {
  
  form!: FormGroup;
  usuarios: Usuario[] = [];
  cargos: string[] = [];
  selectedUsuario: Usuario | null = null;
  sidebarVisible: boolean = false;
  loading: boolean = true;
  submitted = false;
  usuarioEditar: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los usuarios'
        });
      }
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

  recargarUsuarios() {
    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
      const cargosSet = new Set(usuarios.map(u => u.cargo));
      this.cargos = Array.from(cargosSet);
    });
  }
}
