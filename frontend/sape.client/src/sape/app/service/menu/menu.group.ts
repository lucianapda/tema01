import { AppRouteMappging } from './../../app.routing.mapping';

import { MenuOption} from './menu.option';

export class MenuGroup {

  name: string;
  id: string;
  icon: string;
  router: string;
  routerRegExp: RegExp;
  menuOptions: Array<MenuOption> = new Array<MenuOption>();

  constructor(name: string, id: string, icon: string, router: string, routerRegExp: RegExp) {
    this.name = name;
    this.id = id;
    this.icon = icon;
    this.router = router;
    this.routerRegExp = routerRegExp;
  }

  toString() {
    return this.name;
  }
}
