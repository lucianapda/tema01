import {MenuGroup} from './menu.group';

export class MenuOption {
    id: string;
    name: string;
    icon: string;
    router: string;
    routerRegExp: RegExp;
    keyMenuGroup: string;
    text: string;
    subMenuOptions: Array<MenuOption> = new Array<MenuOption>();

    constructor(name: string, id: string, icon: string, router: string, routerRegExp: RegExp, menuParent: MenuGroup | MenuOption) {
      this.name = name;
      this.id = id;
      this.icon = icon;
      this.router = router;
      this.routerRegExp = routerRegExp;
      this.text = name;
      if (menuParent instanceof MenuGroup) {
        this.keyMenuGroup = menuParent.id;
        menuParent.menuOptions.push(this);
      } if (menuParent instanceof MenuOption) { 
        this.keyMenuGroup = menuParent.keyMenuGroup;
      }
    }

    toString() {
      return this.name;
    }
}
