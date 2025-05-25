import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormularioMercanciaComponent } from './components/formulario-mercancia/formulario-mercancia.component';
import { ListaMercanciaComponent } from './components/lista-mercancia/lista-mercancia.component';
import { FiltroBusquedaComponent } from "./components/filtro-busqueda/filtro-busqueda.component";
import { PruebasComponent } from "./components/pruebas/pruebas.component";


@Component({
  selector: 'app-root',

  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    FormularioMercanciaComponent,
    ListaMercanciaComponent,
    FiltroBusquedaComponent,
    PruebasComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventario-front';
}
