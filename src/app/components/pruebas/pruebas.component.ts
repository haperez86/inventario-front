import { ButtonModule } from 'primeng/button';
import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';


import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pruebas',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass, FormsModule, DatePicker],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.scss'
})
export class PruebasComponent {
    date: Date | undefined;
      @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e:any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;

}
