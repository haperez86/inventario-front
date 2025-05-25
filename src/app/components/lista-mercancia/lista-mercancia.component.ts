import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MercanciaService } from '../../services/mercancia.service';
import { Mercancia } from '../../models/mercancia.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FormularioMercanciaComponent } from "../formulario-mercancia/formulario-mercancia.component";

@Component({
  selector: 'app-lista-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    FormularioMercanciaComponent
  ],
  templateUrl: './lista-mercancia.component.html',
  styleUrls: ['./lista-mercancia.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListaMercanciaComponent implements OnInit {

  mercancias: Mercancia[] = [];
  usuarios: Usuario[] = [];
  usuarioSeleccionadoId: number | null = null;

  loading: boolean = true;
  sidebarVisible: boolean = false;
  selectedMercancia: Mercancia | null = null;

  filtroNombre: string = '';
  filtroUsuarioId: number | null = null;
  filtroFechaIngreso: string = '';

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
    private usuarioService: UsuarioService,
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

  mostrarSidebar(mercancia?: Mercancia): void {
    this.selectedMercancia = mercancia ? { ...mercancia } : null;
    this.sidebarVisible = true;
  }

  cerrarSidebar() {
    this.sidebarVisible = false;
    this.selectedMercancia = null;
  }

  eliminarMercancia(mercancia: Mercancia) {
    if (!this.usuarioSeleccionadoId) {
      alert('Debe seleccionar un usuario para eliminar la mercancía.');
      return;
    }

    if (+ (mercancia.usuarioRegistroId ?? -1) !== + (this.usuarioSeleccionadoId ?? -1)) {
      alert('Solo el usuario que registró la mercancía puede eliminarla.');
      return;
    }

    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar la mercancía "${mercancia.nombre}"?`,
      accept: () => {
        this.mercanciaService.eliminar(mercancia.id!, this.usuarioSeleccionadoId!).subscribe({
          next: () => {
            alert('Mercancía eliminada correctamente');
            this.cargarMercancias();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            alert('No se pudo eliminar la mercancía');
          }
        });
      }
    });
  }

  buscarMercanciasConFiltros() {
    if (!this.filtroNombre && !this.filtroUsuarioId && !this.filtroFechaIngreso) {
      alert('Debe ingresar al menos un filtro para buscar.');
      return;
    }

    this.loading = true;
    this.mercanciaService.buscar(
      this.filtroNombre || undefined,
      this.filtroUsuarioId || undefined,
      this.filtroFechaIngreso || undefined
    ).subscribe({
      next: (data) => {
        this.mercancias = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error al filtrar las mercancías.');
      }
    });
  }

  onSidebarVisibleChange(visible: boolean) {
    this.sidebarVisible = visible;
    if (!visible) {
      this.selectedMercancia = null;
    }
  }

  // ✅ Método para mostrar el nombre del usuario
  obtenerNombreUsuario(id: number | null | undefined): string {
    if (!id) return '';
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : '';
  }
}
