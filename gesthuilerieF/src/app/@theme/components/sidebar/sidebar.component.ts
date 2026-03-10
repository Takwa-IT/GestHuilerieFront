import { Component } from '@angular/core';
import { OneColumnLayoutComponent } from '../../layouts/one-column/one-column.layout';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ngx-sidebar-shell',
    styleUrls: ['./sidebar.component.scss'],
    template: `
    <ngx-one-column-layout>
      <ngx-sidebar-menu></ngx-sidebar-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
    standalone: true,
    imports: [
        OneColumnLayoutComponent,
        SidebarMenuComponent,
        RouterOutlet,
    ],
})
export class SidebarComponent {}
