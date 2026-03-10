import { Component } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentTheme = 'default';
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService, private themeService: NbThemeService) {}

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }

  changeTheme(themeName: string): void {
    this.currentTheme = themeName;
    this.themeService.changeTheme(themeName);
  }
}
