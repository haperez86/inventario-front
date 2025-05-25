import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormularioMercanciaComponent } from './components/formulario-mercancia/formulario-mercancia.component';
import { ListaMercanciaComponent } from './components/lista-mercancia/lista-mercancia.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-root',

  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    PanelMenuModule,
    FormularioMercanciaComponent,
    ListaMercanciaComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventario-front';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Mercancía',
        icon: 'pi pi-box',
        routerLink: '/mercancia'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: '/usuarios'
      }
    ];
  }
}
