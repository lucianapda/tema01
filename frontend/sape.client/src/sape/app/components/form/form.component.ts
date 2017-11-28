import { MessageService, MESSAGE_SUCCESS } from './../../service/message/message.service';
import { ServiceLocator } from './../../service/locator/service.locator';
import { MenuService } from './../../service/menu/menu.service';
import { MenuOption } from './../../service/menu/menu.option';
import { SAPE_PAGES_REGISTER_EVENTS } from './../../app.routing.mapping';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AppActionTask, AppActionType } from './../../core/task/action/app.action.task';
import {BaseComponent} from '../base/base.component';
import {BaseDTO} from '../../model/base/base.dto';
import {BaseCrudService} from '../../service/crud/base.crud';
import { NavigationExtras } from '@angular/router/src/router';
import { Subscription } from 'rxjs/Subscription';

export abstract class FormComponent<T extends BaseDTO | BaseDTO> extends BaseComponent {
  
  protected originalSource: T;
  protected currentSource: T;
  protected source: BehaviorSubject<T> ;
  public sourceForm: FormGroup;
  protected loading: boolean = false;
  protected menuOption: MenuOption;
  private subscription: Subscription;
  
  protected abstract getCrudService(): BaseCrudService<T>;
  protected abstract buildForm(formBuilder: FormBuilder, source: T): FormGroup;
  protected abstract bindForm(sourceForm: FormGroup, source: T): void;
  protected abstract newSource(): T;
  protected abstract onCancel() : void;
  protected abstract onCancel() : void;

  constructor(protected route: ActivatedRoute, protected formBuilder: FormBuilder, protected router: Router) {
    super();
    this.originalSource = this.newSource();
    this.currentSource = Object.assign({}, this.originalSource);
    this.source = new BehaviorSubject<T>(this.currentSource);
    this.sourceForm = this.buildForm(this.formBuilder, this.currentSource);
    this.bindForm(this.sourceForm, this.currentSource);
    this.subscription = this.sourceForm.valueChanges.subscribe((value: T) => {this.source.next(value)});
  }

  protected getActionInit() : AppActionTask {
    this.menuOption = this.menuService().getMenuOptionSelected();
    return this.createAction(AppActionType.READING)
      ._before((v?: any): Promise<any> | any | void => this.showLoading()) 
      ._execute((v?: any): Promise<any> | any | void => { 
        let id = this.route.snapshot.params['id'];
        if (id) {
          return this.getCrudService().readById(this.route.snapshot.params['id']).then((values: Array<T> | T) => {
              if (values instanceof Array) {
                this.source = new BehaviorSubject(values[0]);
              } if (values instanceof Object) {
                this.source = new BehaviorSubject(<T> values);
              } else {
                this.source = new BehaviorSubject(this.newSource());
              }
              this.originalSource = this.source.getValue();
              this.currentSource = Object.assign({}, this.originalSource);
              this.bindForm(this.sourceForm, this.currentSource);
            }).catch( (errors) => {
              errors.forEach((error: any) => {
                this.messageService().error(error.message, "Erro o ler o cadastro especificado!");
              });
            });
        } 
      })._after((v?: any): Promise<any> | any | void => this.hideLoading());
  }

  protected onSave(): void {
    let sourceValue : T = this.source.getValue();
    if (this.source.getValue()) {
      let task: AppActionTask = null;
      if (!sourceValue.id) {
        task =  this.createAction(AppActionType.CREATING);
        task
        ._before((v?: any): Promise<any> | any | void => this.showLoading()) 
        ._execute((v?: any): Promise<any> | any | void => {
          return this.getCrudService().create(sourceValue).then((values: Array<T> | T) => {
                  if (values) {
                    if (values instanceof Array) {
                      this.source.next(values[0]);
                    } if (values instanceof Object) {
                      this.source.next(<T> values);
                    } 
                    this.bindForm(this.sourceForm, this.source.getValue());
                    this.messageService().success("Registro atualizado com sucesso!", MESSAGE_SUCCESS);
                  }
                }).catch((errors: any) => {
                  errors.forEach((error: any) => {
                    this.messageService().error(error.message, "Erro ao criar o cadastro especificado!");
                  });
                });
        })
        ._after((v?: any): Promise<any> | any | void => this.hideLoading());
      } else {
        if (sourceValue.id) {
          task =  this.createAction(AppActionType.UPDATING);
          task
          ._before((v?: any): Promise<any> | any | void => {this.showLoading()}) 
          ._execute((v?: any): Promise<any> | any | void => {
            return this.getCrudService().update(sourceValue).then((values: Array<T> | T) => {
                    if (values) {
                      if (values instanceof Array) {
                        this.source.next(values[0]);
                      } if (values instanceof Object) {
                        this.source.next(<T> values);
                      }
                      this.bindForm(this.sourceForm, this.source.getValue());
                      this.messageService().success("Registro criado com sucesso!", MESSAGE_SUCCESS);
                    }
                  }).catch((errors: any) => {
                    errors.forEach((error: any) => {
                      this.messageService().error(error.message, "Erro ao atualizar o cadastro especificado!");
                    });
                  });
          })
          ._after((v?: any): Promise<any> | any | void => this.hideLoading());
        }
      }
      if (task) {
        this.runner(task);
      }
    }
  }

  protected showLoading() : void {
    this.loading = true;
  }

  protected hideLoading() : void {
    this.loading = false;
  }

  ngAfterViewInit() {
    this.menuOption = this.menuService().getMenuOptionSelected();
  } 

  protected goTo(commands: any[], extras?: NavigationExtras) {
    this.router.navigate(commands, extras);
  }

  protected afterSave() : void {};

  protected menuService() : MenuService {
    return ServiceLocator.get(MenuService);
  }

  protected messageService() : MessageService {
    return ServiceLocator.get(MessageService);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
    this.originalSource =  undefined;
    this.currentSource =  undefined;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.source) {
      this.source.unsubscribe();
    }
    this.sourceForm = undefined
    this.loading = false;
    this.menuOption = undefined;
  }
}