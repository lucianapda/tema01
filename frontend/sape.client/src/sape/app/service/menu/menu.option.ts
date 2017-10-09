import {MenuGroup} from './menu.group';

export class MenuOption {
    id: string;
    name: string;
    icon: string;
    router: string;
    keyMenuGroup: string;
    text: string;

    constructor(name: string, id: string, icon: string, router: string, menuGroup: MenuGroup) {
      this.name = name;
      this.id = id;
      this.icon = icon;
      this.router = router;
      this.keyMenuGroup = menuGroup.id;
      menuGroup.menuOptions.push(this);
      this.text = name;
    }

    toString() {
      return this.name;
    }
}
