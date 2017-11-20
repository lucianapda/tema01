import { SAPE_PAGES, SAPE_PAGES_HOME, SAPE_PAGES_REGISTER, SAPE_PAGES_CONFIGURATION, SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_SUBSCRIPTIONS, SAPE_PAGES_REGISTER_PEOPLE, SAPE_PAGES_REGISTER_EVENTS_EDIT, SAPE_LOGIN, SAPE_NOT_FOUND, SAPE_PAGES_REGISTER_ENTRIES, SAPE_PAGES_REGISTER_PEOPLE_EDIT, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT, SAPE_PAGES_REGISTER_ENTRIES_EDIT, SAPE_PAGES_REGISTER_EVENTS_NEW } from './../../app.routing.mapping';
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

  private rootGroup: MenuGroup;
  private rootMenuOption: MenuOption;
  private mapMenuGroups: Map<string, MenuGroup> = new Map();
  private mapMenuOptions: Map<string, MenuOption> = new Map();
  
  private notify: Subject<any> = new Subject<any>();

  constructor(private router: Router, private storageService: StorageService) {
    // Grupos
    this.rootGroup = new MenuGroup('Páginas', 'pages', 'home', SAPE_PAGES.routingFull, SAPE_PAGES.routingFullRegExp);
    let register: MenuGroup = new MenuGroup('Cadastro', 'register', 'add square', SAPE_PAGES_REGISTER.routingFull, SAPE_PAGES_REGISTER.routingFullRegExp);
    let config: MenuGroup = new MenuGroup('Configuração', 'configuration','configure', SAPE_PAGES_CONFIGURATION.routingFull, SAPE_PAGES_CONFIGURATION.routingFullRegExp);
    
    // Opções
    let home: MenuOption = new MenuOption('Home', 'home', 'home', SAPE_PAGES_HOME.routingFull, SAPE_PAGES_HOME.routingFullRegExp, this.rootGroup);
    this.rootMenuOption = home;
    
    let event: MenuOption = new MenuOption('Eventos', 'event', 'calendar outline', SAPE_PAGES_REGISTER_EVENTS.routingFull, SAPE_PAGES_REGISTER_EVENTS.routingFullRegExp, register);
    event.subMenuOptions.push(new MenuOption('Eventos', 'event', 'calendar outline', SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFullRegExp, event));
    event.subMenuOptions.push(new MenuOption('Eventos', 'event', 'calendar outline', SAPE_PAGES_REGISTER_EVENTS_NEW.routingFull, SAPE_PAGES_REGISTER_EVENTS_NEW.routingFullRegExp, event));
    
    let entry: MenuOption = new MenuOption('Entradas', 'entry', 'wait', SAPE_PAGES_REGISTER_ENTRIES.routingFull, SAPE_PAGES_REGISTER_ENTRIES.routingFullRegExp, register);
    entry.subMenuOptions.push(new MenuOption('Entradas', 'entry', 'wait', SAPE_PAGES_REGISTER_ENTRIES_EDIT.routingFull, SAPE_PAGES_REGISTER_ENTRIES_EDIT.routingFullRegExp, entry));
    
    let subscription: MenuOption = new MenuOption('Inscrições', 'subscription', 'edit', SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingFull, SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingFullRegExp, register);
    subscription.subMenuOptions.push(new MenuOption('Inscrições', 'subscription', 'edit', SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT.routingFull, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT.routingFullRegExp, subscription));
    
    let people: MenuOption = new MenuOption('Pessoas', 'person', 'users', SAPE_PAGES_REGISTER_PEOPLE.routingFull, SAPE_PAGES_REGISTER_PEOPLE.routingFullRegExp, register);
    people.subMenuOptions.push(new MenuOption('Pessoas', 'person', 'users', SAPE_PAGES_REGISTER_PEOPLE_EDIT.routingFull, SAPE_PAGES_REGISTER_PEOPLE_EDIT.routingFullRegExp, people));
    
    this.rootGroup.menuOptions.push(event);
    this.rootGroup.menuOptions.push(entry);
    this.rootGroup.menuOptions.push(subscription);
    this.rootGroup.menuOptions.push(people);

    this.mapMenuGroups.set(register.id, register);
    this.mapMenuGroups.set(config.id, config);

    this.mapMenuOptions.set(home.id, home);
    this.mapMenuOptions.set(event.id, event);
    this.mapMenuOptions.set(entry.id, entry);
    this.mapMenuOptions.set(subscription.id, subscription);
    this.mapMenuOptions.set(people.id, people); 
  }

  /**
   * Retorna a opção root do menu
   * @return {@link MenuOption}
   */
  public getRootMenuOption() : MenuOption {
    return this.rootMenuOption;
  }

  /**
   * Retorna um Map com todas as opções, mantida por uma chave string
   * @return @link Map:key string, value: MenuOption
   */
  public getMenuOptions() : Map<string, MenuOption> {
    return this.mapMenuOptions;
  }

   /**
   * Retorna um Map com todos os grupos, mantido por uma chave string
   * @return @link Map:key string, value: MenuGroup
   */
  public getMenuGroups() : Map<string, MenuGroup> {
    return this.mapMenuGroups;
  }

  public getMenuOptionSelected() : MenuOption {
    var option: Object = this.storageService.get(KEY_MENU_OPTION_SELECTED);
    if (!!option) {
      let menuOption: MenuOption = (<MenuOption> option);
      // this.router.navigateByUrl(menuOption.router);
      return menuOption;
    }
    return  null;
  }

  /**
   * Armazena a opção do menu selecionada, persistindo ela no storageService
   * @param selected - {@link MenuOption}
   * @param navigate - {@link boolean} indica se deve realizar a navegação para a rota da opção.
   */
  public setMenuOptionSelected(selected: MenuOption, navigate: boolean) {
    this.storageService.put(KEY_MENU_OPTION_SELECTED, selected);
    if (selected) {
      this.setMenuGroupSelected(this.mapMenuGroups.get(selected.keyMenuGroup), false);
      this.notify.next(selected);
      if (navigate) {
          this.router.navigateByUrl(selected.router);
      }
    }
  } 

  /**
   * Retorna o grupo selecionado.
   * @returns {@link MenuGroup}
   */
  public getMenuGroupSelected() : MenuGroup {
    var groupObj: Object = this.storageService.get(KEY_MENU_GROUP_SELECTED);
    if (groupObj) {
      let menuGroup: MenuGroup = (<MenuGroup> groupObj);
      return menuGroup;
    }
    this.resetMenuGroupSelected();
    return this.getMenuGroupSelected();
  }

  /**
   * Armazena grupo selecionado, persistindo elo no storageService.
   * @param selected - {@link MenuGroup}
   * @param navigate - {@link boolean} indica se deve realizar a navegação para a rota dp grupo.
   */
  public setMenuGroupSelected(selected: MenuGroup, navigate: boolean) {
    this.storageService.put(KEY_MENU_GROUP_SELECTED, selected);
    if (selected) {
      this.notify.next(selected);
      if (navigate) {
          this.router.navigateByUrl(selected.router);
      }
    }
  }

  /**
   * Reseta a opção selecionada para nulo.
   */
  public resetMenuOptionSelected() {
    this.setMenuOptionSelected(this.rootMenuOption, false);
  }

   /**
   * Reseta o grupo selecionado para o root grupo.
   */
  public resetMenuGroupSelected() {
    this.resetMenuOptionSelected();
    this.setMenuGroupSelected(this.rootGroup, true);
  }

  /**
   * Registra uma função para ser notificada.
   */
  public registerNotify(notify: (value: any) => void) {
    this.notify.subscribe(notify);
  }

  /**
   * Seleciona um MenuGroup ou MenuOption correspondente a url
   * @param url - String - A url informada.
   * @param navigate - boolean - Indica se deve navegar para a url.
   */
  public selectMenuByUrl(url: string, navigate?: boolean) {
    let currentOption: MenuOption = this.getMenuOptionSelected();
    if (currentOption)  {
      currentOption = this.mapMenuOptions.get(this.getMenuOptionSelected().id);
      if (currentOption && StringUtils.test(currentOption.routerRegExp, url)) {
        return;
      }
    }

    let resultOption: MenuOption = null;
    // Procura no map de opções e nas subopções
    this.mapMenuOptions.forEach((value: MenuOption, key: string) => { 
      if (StringUtils.test(value.routerRegExp, url)){
        resultOption = value;
      } else {
        value.subMenuOptions.forEach((valueSub: MenuOption) => { 
          if (StringUtils.test(valueSub.routerRegExp, url)){
            resultOption = valueSub;
          }   
        });
      }
    });
    if (resultOption != null) {
      this.setMenuOptionSelected(resultOption, navigate);
      console.log("achou opcao")
    } else {
      let resultGroup: MenuGroup = null;
      if (StringUtils.test(this.rootGroup.routerRegExp, url)){
        resultGroup = this.rootGroup;
      }
      this.mapMenuGroups.forEach((value: MenuGroup, key: string) => { 
        if (StringUtils.test(value.routerRegExp, url)){
          resultGroup = value;
        }
      });
      if (resultGroup != null) {
        this.setMenuGroupSelected(resultGroup, navigate);
        console.log("achou grupo")
      } else {
        // Excluir rotas
        if (!StringUtils.test(SAPE_LOGIN.routingFullRegExp, url) && 
              !StringUtils.test(SAPE_NOT_FOUND.routingFullRegExp, url)){
                console.log("volta pro root")
                this.resetMenuGroupSelected();
        }
      }
    }
  }
}