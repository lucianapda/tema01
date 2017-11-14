import { MenuOption } from './../../service/menu/menu.option';
import { ServiceLocator } from './../../service/locator/service.locator';
import { MenuService } from './../../service/menu/menu.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'breadcrumb',
    styleUrls: ['./breadcrumb.component.css'],
    templateUrl: `./breadcrumb.component.html`,
  })
export class BreadcrumbComponent implements OnInit {
  
  private rootMenuOption: MenuOption;
  private routeMenuOptions: Array<MenuOption> = new Array<MenuOption>();

  constructor() {
    this.rootMenuOption = this.menuService().getRootMenuOption();
    this.menuService().registerNotify((v) => {
      this.routeMenuOptions.pop();
      this.routeMenuOptions.push(this.menuService().getMenuOptionSelected());
    });
  }

  ngOnInit(): void {
  }

  private menuService() : MenuService {
    return ServiceLocator.get(MenuService);
  }
}