import { SAPE_PAGES, SAPE_PAGES_HOME, SAPE_PAGES_REGISTER, SAPE_PAGES_CONFIGURATION, SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES, SAPE_PAGES_REGISTER_EVENTS_ENTRIES, SAPE_PAGES_REGISTER_SUBSCRIPTIONS, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES, SAPE_PAGES_REGISTER_PEOPLE, SAPE_PAGES_REGISTER_EVENTS_EDIT } from './../../app.routing.mapping';
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
    let pages: MenuGroup = new MenuGroup('Páginas', 'pages', 'fa fa-home', SAPE_PAGES.routingFull, SAPE_PAGES.routingFullRegExp);
    let register: MenuGroup = new MenuGroup('Cadastro', 'register', 'fa fa-address-book', SAPE_PAGES_REGISTER.routingFull, SAPE_PAGES_REGISTER.routingFullRegExp);
    let config: MenuGroup = new MenuGroup('Configuração', 'configuration','fa fa-cogs', SAPE_PAGES_CONFIGURATION.routingFull, SAPE_PAGES_CONFIGURATION.routingFullRegExp);
    
    // Opções
    let home: MenuOption = new MenuOption('Home', 'home', 'fa fa-home', SAPE_PAGES_HOME.routingFull, SAPE_PAGES_HOME.routingFullRegExp, pages);
    let event: MenuOption = new MenuOption('Eventos', 'event', 'fa fa-server', SAPE_PAGES_REGISTER_EVENTS.routingFull, SAPE_PAGES_REGISTER_EVENTS.routingFullRegExp, register);
    let eventEdit: MenuOption = new MenuOption('Eventos', 'event', 'fa fa-server', SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFullRegExp, register);
    event.subMenuOptions.push(eventEdit);
    //let eventActivity: MenuOption = new MenuOption('Atividades', 'event_activity', 'fa fa-vcard', SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES.routingFull, SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES.routingFullRegExp, register);
    let eventEntry: MenuOption = new MenuOption('Entradas', 'entry', 'fa fa-user', SAPE_PAGES_REGISTER_EVENTS_ENTRIES.routingFull, SAPE_PAGES_REGISTER_EVENTS_ENTRIES.routingFullRegExp, register);
    let subscription: MenuOption = new MenuOption('Inscrições', 'subscription', 'fa fa-server', SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingFull, SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingFullRegExp, register);
    //let subscriptionActivity: MenuOption = new MenuOption('Atividades', 'subscription_activity', 'fa fa-vcard', SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES.routingFull, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES.routingFullRegExp, register);   
    let people: MenuOption = new MenuOption('Pessoas', 'person', 'fa fa-vcard', SAPE_PAGES_REGISTER_PEOPLE.routingFull, SAPE_PAGES_REGISTER_PEOPLE.routingFullRegExp, register);   
    
    pages.menuOptions.push(home);
    pages.menuOptions.push(event);
    //pages.menuOptions.push(eventActivity);
    pages.menuOptions.push(eventEntry);
    pages.menuOptions.push(subscription);
    //pages.menuOptions.push(subscriptionActivity);
    pages.menuOptions.push(people);

    this.mapMenuGroups.set(pages.id, pages);
    this.mapMenuGroups.set(register.id, register);
    this.mapMenuGroups.set(config.id, config);

    this.mapMenuOptions.set(home.id, home);
    this.mapMenuOptions.set(event.id, event);
    //this.mapMenuOptions.set(eventActivity.id, eventActivity);
    this.mapMenuOptions.set(eventEntry.id, eventEntry);
    this.mapMenuOptions.set(subscription.id, subscription);
    //this.mapMenuOptions.set(subscriptionActivity.id,  subscriptionActivity);
    this.mapMenuOptions.set(people.id, people); 
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

  public setMenuUrl(url: string, navigate?: boolean, group?: boolean) {
    let resultOption: MenuOption = null;
    this.mapMenuOptions.forEach((value: MenuOption, key: string) => { 
      if (StringUtils.test(value.routerRegExp, url)){
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
        if (StringUtils.test(value.routerRegExp, url)){
          result = value;
        }
      });
      if (result != null) {
        this.setMenuGroupSelected(result, navigate);
        //this.setMenuOptionSelected(null, false);
        this.notify.next(result);
        console.log("achou grupo")
      } else if (StringUtils.notEquals(url, "/")){
        console.log("volta pro home")
        this.resetMenuGroupSelected();
        this.notify.next(this.mapMenuGroups.values().next().value);
      }
    }
  }
}
