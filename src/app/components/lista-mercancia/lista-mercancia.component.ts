import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MercanciaService } from '../../services/mercancia.service';
import { Mercancia } from '../../models/mercancia.model';

// **Importa Usuario y el servicio**
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './lista-mercancia.component.html',
  styleUrls: ['./lista-mercancia.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListaMercanciaComponent implements OnInit {
  mercancias: Mercancia[] = [];
  usuarios: Usuario[] = [];   // <-- array para dropdown usuarios
  usuarioSeleccionadoId: number | null = null; // <-- variable para id usuario seleccionado

  loading: boolean = true;
  sidebarVisible: boolean = false;
  selectedMercancia: Mercancia | null = null;

  colsMercancia = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'fechaIngreso', header: 'Fecha Ingreso' },
    { field: 'usuarioRegistroId', header: 'Usuario Registro' },
    { field: 'usuarioModificacionId', header: 'Usuario Modificación' },
    { field: 'fechaModificacion', header: 'Fecha Modificación' }
  ];

  constructor(
    private mercanciaService: MercanciaService,
    private usuarioService: UsuarioService,   // <-- inyecta el servicio usuarios
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarMercancias();
    this.cargarUsuarios();

    this.mercanciaService.mercanciaActualizada$.subscribe(() => {
      this.cargarMercancias();
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los usuarios'
        });
      }
    });
  }

  cargarMercancias(): void {
    this.loading = true;
    this.mercanciaService.listar().subscribe({
      next: (data) => {
        console.log('Mercancias recibidas:', data);  // <--- Agrega esto
        this.mercancias = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las mercancías'
        });
      }
    });
  }

  mostrarSidebar(mercancia?: Mercancia) {
    this.selectedMercancia = mercancia ?? null;
    this.sidebarVisible = true;
  }

  cerrarSidebar() {
    this.sidebarVisible = false;
    this.selectedMercancia = null;
  }

  eliminarMercancia(mercancia: Mercancia) {
    if (!this.usuarioSeleccionadoId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: 'Debe seleccionar un usuario para eliminar la mercancía.'
      });
      return;
    }

    // Solo permitir eliminar si el usuario es el que registró la mercancía
    if (mercancia.usuarioRegistroId !== this.usuarioSeleccionadoId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Solo el usuario que registró la mercancía puede eliminarla.'
      });
      return;
    }

    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar la mercancía "${mercancia.nombre}"?`,
      accept: () => {
        this.mercanciaService.eliminar(mercancia.id!, this.usuarioSeleccionadoId!).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Mercancía eliminada correctamente'
            });
            this.cargarMercancias();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la mercancía'
            });
          }
        });
      }
    });
  }
}
