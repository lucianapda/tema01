import { SAPE_PAGES_HOME, SAPE_PAGES_ALL, SAPE_PAGES_REGISTER, SAPE_PAGES_CONFIGURATION, SAPE_PAGES_REGISTER_MODULE, SAPE_PAGES_REGISTER_COSTUMER, SAPE_PAGES_REGISTER_USER } from './../../app.routing.mapping';
import { StringUtils } from './../../util/string/string.utils';
import { Injectable } from '@angular/core';
import { MenuGroup } from './menu.group';
import { MenuOption } from './menu.option';
import { Router } from '@angular/router';
import { StorageService} from '../../service/storage/storage.service';
import { Subject }    from 'rxjs/Subject';

const KEY_MENU_OPTION_SELECTED: string = "KEY_MENU_OPTION_SELECTED";
const KEY_MENU_GROUP_SELECTED: string = "KEY_MENU_GROUP_SELECTED";

@Injectable()
export class MenuService {

  private mapMenuGroups: Map<string, MenuGroup> = new Map();
  private mapMenuOptions: Map<string, MenuOption> = new Map();
  
  private notify: Subject<any> = new Subject<any>();

  constructor(private router: Router, private storageService: StorageService) {
    // Grupos
    let home: MenuGroup = new MenuGroup('Home', 'home', 'fa fa-home', SAPE_PAGES_HOME.routingFull);
    let all: MenuGroup = new MenuGroup('Todos', 'all', 'fa fa-map-o', SAPE_PAGES_ALL.routingFull);
    let register: MenuGroup = new MenuGroup('Cadastro', 'register', 'fa fa-address-book', SAPE_PAGES_REGISTER.routingFull);
    let config: MenuGroup = new MenuGroup('Configuração', 'configuration','fa fa-cogs', SAPE_PAGES_CONFIGURATION.routingFull);
    // Opções
    let module: MenuOption = new MenuOption('Módulos', 'module', 'fa fa-server', SAPE_PAGES_REGISTER_MODULE.routingFull, register);
    let costumer: MenuOption = new MenuOption('Clientes', 'costumer', 'fa fa-vcard', SAPE_PAGES_REGISTER_COSTUMER.routingFull, register);
    let user: MenuOption = new MenuOption('Usuários', 'user', 'fa fa-user', SAPE_PAGES_REGISTER_USER.routingFull, register);

    all.menuOptions.push(module);
    all.menuOptions.push(costumer);
    all.menuOptions.push(user);

    this.mapMenuGroups.set(home.id, home);
    this.mapMenuGroups.set(all.id, all);
    this.mapMenuGroups.set(register.id, register);
    this.mapMenuGroups.set(config.id, config);

    this.mapMenuOptions.set(module.id, module);
    this.mapMenuOptions.set(costumer.id, costumer);
    this.mapMenuOptions.set(user.id, user);
  }

  public getMenuOptions() : Map<string, MenuOption> {
    return this.mapMenuOptions;
  }

  public getMenuGroups() : Map<string, MenuGroup> {
    return this.mapMenuGroups;
  }

  public getMenuOptionSelected() : MenuOption {
    var option: Object = this.storageService.get(KEY_MENU_OPTION_SELECTED);
    if (!!option) {
      let menuOption: MenuOption = (<MenuOption> option);
      this.router.navigateByUrl(menuOption.router);
      return menuOption;
    }
    return  null;
  }

  public setMenuOptionSelected(selected: MenuOption, navigate: boolean) {
    this.storageService.put(KEY_MENU_OPTION_SELECTED, selected);

    if (!!selected && navigate) {
        this.router.navigateByUrl(selected.router);
    }
  }

  public getMenuGroupSelected() : MenuGroup {
    var option: Object = this.storageService.get(KEY_MENU_GROUP_SELECTED);
    if (!!option) {
      let menuGroup: MenuGroup = (<MenuGroup> option);
      this.router.navigateByUrl(menuGroup.router);
      return menuGroup;
    }
    let group: MenuGroup = this.mapMenuGroups.values().next().value;
    this.setMenuGroupSelected(group, true);
    return group;
  }

  public setMenuGroupSelected(selected: MenuGroup, navigate: boolean) {
    this.storageService.put(KEY_MENU_GROUP_SELECTED, selected);
    if (!!selected && navigate) {
        this.router.navigateByUrl(selected.router);
    }
  }

  public resetMenuOptionSelected() {
    this.setMenuOptionSelected(null, false);
  }

  public reloadMenuOptionSelected() {
    this.setMenuOptionSelected(this.getMenuOptionSelected(), true);
  }

  public resetMenuGroupSelected() {
    this.setMenuGroupSelected(this.mapMenuGroups.values().next().value, false);
    this.resetMenuOptionSelected();
  }

  public reloadMenuGroupSelected() {
    this.setMenuGroupSelected(this.getMenuGroupSelected(), true);
    this.resetMenuOptionSelected();
  }

  public notifyComponent(notify: (value: any) => void) {
    this.notify.subscribe(notify);
  }

  public setMenuUrl(url: string, navigate?: boolean) {
    let resultOption: MenuOption = null;
    this.mapMenuOptions.forEach((value: MenuOption, key: string) => { 
      if (StringUtils.equals(url, value.router)){
        resultOption = value;
      }
    });
    if (resultOption != null) {
      this.setMenuOptionSelected(resultOption, navigate);
      this.notify.next(resultOption);
      console.log("achou opcao")
    } else {
      let result: MenuGroup = null;
      this.mapMenuGroups.forEach((value: MenuGroup, key: string) => { 
        if (StringUtils.equals(url, value.router)){
          result = value;
        }
      });
      if (result != null) {
        this.setMenuGroupSelected(result, navigate);
        this.setMenuOptionSelected(null, false);
        this.notify.next(result);
        console.log("achou grupo")
      } else {
        console.log("volta pro home")
        this.resetMenuGroupSelected();
        this.notify.next(this.mapMenuGroups.values().next().value);
      }
    }
  }
}
