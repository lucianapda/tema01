import { AuthService } from './../../service/auth/auth.service';
import { MenuSideBarService } from './../../service/menu/menu-sidebar.service';
import { ServiceLocator } from './../../service/locator/service.locator';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bartop',
  styleUrls: ['./bartop.component.css'],
  templateUrl: `./bartop.component.html`,
})
export class BartopComponent {

  private menuSidebarService() : MenuSideBarService {
    return ServiceLocator.get(MenuSideBarService);
  }

  private authService() : AuthService {
    return ServiceLocator.get(AuthService);
  }

  public openMenuSidebar() {
    this.menuSidebarService().executeOnOpen();
  }

  public logout() {
    this.authService().logout();
  }

  public myAccount() {
    alert("Minha conta")
  }
}