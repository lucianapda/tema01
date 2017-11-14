import { MenuOption } from './../../../service/menu/menu.option';
import { MenuGroup } from './../../../service/menu/menu.group';
import {MenuService} from '../../../service/menu/menu.service';
import {MenuSideBarService} from '../../../service/menu/menu-sidebar.service';
import {ServiceLocator} from '../../../service/locator/service.locator';
import { Component, ViewChild, ElementRef } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'menu-sidebar' ,
    templateUrl: './menu-sidebar.component.html',
  })
export class MenuSideBarComponent {

  menuOptionRoot: MenuOption;
  menuGroups : Array<MenuGroup>;

  constructor() {
    this.menuSidebarService().registerOnOpen(() => { 
      $('#contentPushable .ui.sidebar')
      .first()
      .sidebar({context:$('#contentPushable')})
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('toggle');
    }); 

    this.menuSidebarService().registerOnClose(() => {
      $('#contentPushable .ui.sidebar')
      .first()
      .sidebar({context:$('#contentPushable')})
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('hide');
    });

    this.menuGroups = Array.from(this.menuService().getMenuGroups().values());
    this.menuOptionRoot = this.menuService().getRootMenuOption(); 
  }
  
  protected selectOption(menuOption: MenuOption) {
    this.menuService().setMenuOptionSelected(menuOption, true);
  }

  private menuSidebarService() : MenuSideBarService {
    return ServiceLocator.get(MenuSideBarService);
  }

  private menuService() : MenuService {
    return ServiceLocator.get(MenuService);
  }
}