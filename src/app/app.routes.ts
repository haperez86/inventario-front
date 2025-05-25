import { RouterModule, Routes } from '@angular/router';
import { ListaMercanciaComponent } from './components/lista-mercancia/lista-mercancia.component';
import { UsuarioSelectorComponent } from './components/usuario-selector/usuario-selector.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'mercancia', component: ListaMercanciaComponent },
  { path: 'usuarios', component: UsuarioSelectorComponent },
  { path: '', redirectTo: '/mercancia', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}