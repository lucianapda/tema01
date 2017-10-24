import { Component, EventEmitter, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu/menu.service';
import { MenuOption } from '../../service/menu/menu.option';
import { MenuGroup} from '../../service/menu/menu.group';
import { StringUtils } from '../../util/string/string.utils';
import {Subject} from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'menu',
  styleUrls: ['./menu.component.css'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  public menuOptions: Array<MenuOption> = [];
  menuGroups: MenuGroup[];
  private mapMenuOptions: Map<string, MenuOption> = new Map();
  private mapMenuGroups: Map<string, MenuGroup> = new Map();

  private menuGroupSelected: MenuGroup;
  private menuOptionSelected: MenuOption;

  constructor(private menuService: MenuService) {
    this.mapMenuOptions = this.menuService.getMenuOptions();
    this.mapMenuGroups = this.menuService.getMenuGroups();
    this.menuService.notifyComponent((value: any) => {
      if (value instanceof MenuOption) {
        this.menuOptionSelected = value;
      } else if (value instanceof MenuGroup) {
        this.menuGroupSelected = value;
        this.menuOptionSelected = null;
      }
    });
    this.menuGroupSelected = this.menuService.getMenuGroups().get("pages");
    this.menuOptions = this.menuGroupSelected.menuOptions;
    console.log(this.menuOptions)
  }
  
  lookupMenuGroupSelected(event: EventEmitter<any>) {
    if (event != null) {
      this.menuService.setMenuGroupSelected(this.menuGroupSelected, true);
    } else {
      this.menuService.setMenuGroupSelected(null, true);
    }
  }

  ngOnInit() {
   this.menuOptionSelected = this.menuService.getMenuOptionSelected();
   this.menuGroupSelected = this.menuService.getMenuGroupSelected();
  }

  public selected(value:any):void {
    if (value != null) {
      this.menuOptionSelected = this.mapMenuOptions.get(value.id);
      this.menuService.setMenuOptionSelected(this.menuOptionSelected, true);
    } else {
      this.menuService.reloadMenuGroupSelected();
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
