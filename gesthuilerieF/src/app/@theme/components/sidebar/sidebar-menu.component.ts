import { Component } from '@angular/core';
import { MENU_ITEMS } from './sidebar-menu';

@Component({
  selector: 'ngx-sidebar-menu',
  styleUrls: ['./sidebar-menu.component.scss'],
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent {
  items = MENU_ITEMS;
}
