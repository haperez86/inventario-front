import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mercancia } from '../models/mercancia.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  private apiUrl = 'http://localhost:8080/api/mercancias';

  // Subject para notificar actualizaciones
  private mercanciaActualizadaSource = new BehaviorSubject<void>(undefined);
  mercanciaActualizada$ = this.mercanciaActualizadaSource.asObservable();

  constructor(private http: HttpClient) {}

  listar(): Observable<Mercancia[]> {
    return this.http.get<Mercancia[]>(this.apiUrl);
  }

  crear(mercancia: Mercancia): Observable<Mercancia> {
    return this.http.post<Mercancia>(this.apiUrl, mercancia);
  }

  editar(id: number, mercancia: Mercancia): Observable<Mercancia> {
    return this.http.put<Mercancia>(`${this.apiUrl}/${id}`, mercancia);
  }

  eliminar(id: number, idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  buscar(nombre?: string, idUsuario?: number, fechaIngreso?: string): Observable<Mercancia[]> {
    let params = [];
    if (nombre) params.push(`nombre=${nombre}`);
    if (idUsuario) params.push(`idUsuario=${idUsuario}`);
    if (fechaIngreso) params.push(`fechaIngreso=${fechaIngreso}`);
    return this.http.get<Mercancia[]>(`${this.apiUrl}/buscar?${params.join('&')}`);
  }

  // Método para emitir la notificación de actualización
  notifyMercanciaActualizada() {
    this.mercanciaActualizadaSource.next();
  }
}
