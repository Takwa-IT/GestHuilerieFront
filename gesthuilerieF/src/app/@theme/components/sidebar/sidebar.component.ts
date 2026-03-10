import { Component } from '@angular/core';

@Component({
  selector: 'ngx-sidebar-shell',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <ngx-one-column-layout>
      <ngx-sidebar-menu></ngx-sidebar-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class SidebarComponent {}
