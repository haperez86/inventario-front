import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormularioMercanciaComponent } from './components/formulario-mercancia/formulario-mercancia.component';
import { ListaMercanciaComponent } from './components/lista-mercancia/lista-mercancia.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UsuarioSelectorComponent } from "./components/usuario-selector/usuario-selector.component";
import { ListaUsuarioComponent } from "./components/usuario/lista-usuario.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    PanelMenuModule,
    FormularioMercanciaComponent,
    ListaMercanciaComponent,
    UsuarioSelectorComponent,
    ListaUsuarioComponent
],
  providers: [
    ConfirmationService,
    MessageService
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
