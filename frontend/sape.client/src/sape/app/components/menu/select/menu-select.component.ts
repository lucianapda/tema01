import { Component, EventEmitter, OnInit } from '@angular/core';
import { MenuService } from '../../../service/menu/menu.service';
import { MenuOption } from '../../../service/menu/menu.option';
import { MenuGroup} from '../../../service/menu/menu.group';
import { StringUtils } from '../../../util/string/string.utils';
import {Subject} from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'menu-select',
  styleUrls: ['./menu-select.component.css'],
  templateUrl: './menu-select.component.html',
})
export class MenuSelectComponent implements OnInit {

  public mapMenuOptions: Map<String, MenuOption>;
  public menuOptions: Array<MenuOption> = [];

  private menuOptionSelected: MenuOption;

  constructor(private menuService: MenuService) {
    this.menuService.registerNotify((value: any) => {
      if (value instanceof MenuOption) {
        this.menuOptionSelected = value; 
      }
    });
    this.mapMenuOptions = this.menuService.getMenuOptions();
    this.menuOptions = Array.from(this.mapMenuOptions.values());
  }
  
  ngOnInit() {
   this.menuOptionSelected = this.menuService.getMenuOptionSelected();
  }

  public selected(value:any):void {
    if (value != null) {
      this.menuOptionSelected = this.mapMenuOptions.get(value.id);
      this.menuService.setMenuOptionSelected(this.menuOptionSelected, true);
    }
  }
 
  public removed(value:any):void {
    this.menuOptionSelected = null;
    this.menuService.resetMenuOptionSelected();
  }
 
  public refreshValue(value:any):void {
    this.menuOptionSelected = value;
  }
}
