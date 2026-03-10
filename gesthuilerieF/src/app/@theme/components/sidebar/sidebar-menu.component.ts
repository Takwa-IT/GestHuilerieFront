import { Component } from '@angular/core';
import { MENU_ITEMS } from './sidebar-menu';
import { NbMenuModule } from '@nebular/theme';

@Component({
    selector: 'ngx-sidebar-menu',
    styleUrls: ['./sidebar-menu.component.scss'],
    templateUrl: './sidebar-menu.component.html',
    standalone: true,
    imports: [NbMenuModule],
})
export class SidebarMenuComponent {
  items = MENU_ITEMS;
}
