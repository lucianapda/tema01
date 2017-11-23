import { MessageService } from './../../service/message/message.service';
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

export abstract class FormComponent<T extends BaseDTO | BaseDTO> extends BaseComponent {
  
  protected originalSource: T;
  protected currentSource: T;
  protected source: BehaviorSubject<T> ;
  public sourceForm: FormGroup;
  protected loading: boolean = false;
  protected menuOption: MenuOption;
  
  protected abstract getCrudService(): BaseCrudService<T>;
  protected abstract buildForm(formBuilder: FormBuilder, source: T): FormGroup;
  protected abstract bindForm(sourceForm: FormGroup, source: T): void;
  protected abstract newSource(): T;
  protected abstract onCancel() : void;

  constructor(protected route: ActivatedRoute, protected formBuilder: FormBuilder, private router: Router) {
    super();
    this.originalSource = this.newSource();
    this.currentSource = Object.assign({}, this.originalSource);
    this.source = new BehaviorSubject<T>(this.currentSource);
    this.sourceForm = this.buildForm(this.formBuilder, this.currentSource);
    this.bindForm(this.sourceForm, this.currentSource);
    this.sourceForm.valueChanges.subscribe((value: T) => {this.source.next(value)});
  }

  protected getActionInit() : AppActionTask {
    this.menuOption = this.menuService().getMenuOptionSelected();
    return this.createAction(AppActionType.READING)
      ._before(() => this.showLoading()) 
      ._execute(() => { 
        let id = this.route.snapshot.params['id'];
        if (id) {
          this.getCrudService().readById(this.route.snapshot.params['id']).then((values: Array<T> | T) => {
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
          });
        } 
      })._after(() => this.hideLoading());
  }

  protected onSave(): void {
    let sourceValue : T = this.source.getValue();
    if (this.source.getValue()) {
      let task: AppActionTask = null;
      if (!sourceValue.id) {
        task =  this.createAction(AppActionType.CREATING);
        task
        ._before(() => this.showLoading()) 
        ._execute(() => {
          this.getCrudService().create(sourceValue).then((values: Array<T> | T) => {
            if (values instanceof Array) {
              this.source.next(values[0]);
            } if (values instanceof Object) {
              this.source.next(<T> values);
            } else {
              this.source.next(this.newSource());
            }
            this.bindForm(this.sourceForm, this.source.getValue());
          });
        })
        ._after(() => this.hideLoading());
      } else {
        if (sourceValue.id) {
          task =  this.createAction(AppActionType.UPDATING);
          task
          ._before(() => {this.showLoading()}) 
          ._execute(() => {
            this.getCrudService().update(sourceValue).then((values: Array<T> | T) => {
              if (values instanceof Array) {
                this.source.next(values[0]);
              } if (values instanceof Object) {
                this.source.next(<T> values);
              } else {
                this.source.next(this.newSource());
              }
              this.bindForm(this.sourceForm, this.source.getValue());
            });
          })
          ._after(() => this.hideLoading());
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
}