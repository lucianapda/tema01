
import { MenuOption} from './menu.option';

export class MenuGroup {

  name: string;
  id: string;
  icon: string;
  router: string;
  menuOptions: Array<MenuOption> = new Array<MenuOption>();

  constructor(name: string, id: string, icon: string, router: string) {
    this.name = name;
    this.id = id;
    this.icon = icon;
    this.router = router;
  }

  toString() {
    return this.name;
  }
}
