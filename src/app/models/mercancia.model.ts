export interface Mercancia {
  id?: number;
  nombre: string;
  cantidad: number;
  fechaIngreso: string;
  usuarioRegistroId?: number;
  usuarioModificacionId?: number;
  fechaModificacion?: string;
}
