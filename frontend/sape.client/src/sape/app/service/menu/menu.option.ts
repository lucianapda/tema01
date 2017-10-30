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

    constructor(name: string, id: string, icon: string, router: string, routerRegExp: RegExp, menuGroup: MenuGroup) {
      this.name = name;
      this.id = id;
      this.icon = icon;
      this.router = router;
      this.routerRegExp = routerRegExp;
      this.keyMenuGroup = menuGroup.id;
      menuGroup.menuOptions.push(this);
      this.text = name;
    }

    toString() {
      return this.name;
    }
}
