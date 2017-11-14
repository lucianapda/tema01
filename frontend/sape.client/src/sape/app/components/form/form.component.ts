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

export abstract class FormComponent<T extends BaseDTO > extends BaseComponent {
  
  protected orinialSource: T;
  protected source: BehaviorSubject<T>;
  public sourceForm: FormGroup = this.buildForm(this.formBuilder, this.newSource());
  protected loading: boolean = false;
  protected menuOption: MenuOption;
  
  protected abstract getCrudService(): BaseCrudService<T>;
  protected abstract buildForm(formBuilder: FormBuilder, source: T): FormGroup;
  protected abstract bindForm(sourceForm: FormGroup, source: T): void;
  protected abstract newSource(): T;
  protected abstract onCancel() : void;

  constructor(private route: ActivatedRoute, protected formBuilder: FormBuilder, private router: Router) {
    super();
  }

  protected getActionInit() : AppActionTask {
    this.menuOption = this.menuService().getMenuOptionSelected();
    return this.createAction(AppActionType.READING)
      ._before(() => {this.loading = true}) 
      ._execute(() => { 
        this.getCrudService().readById(this.route.snapshot.params['id']).then((values: Array<T> | T) => {
            if (values instanceof Array) {
              this.source = new BehaviorSubject(values[0]);
            } if (values instanceof Object) {
              this.source = new BehaviorSubject(<T> values);
            } else {
              this.source = new BehaviorSubject(this.newSource());
            }
            this.orinialSource = this.source.getValue();
            this.bindForm(this.sourceForm, this.source.getValue());
            this.sourceForm.valueChanges.subscribe((value: T) => {this.source.next(value)});
          });
        })._after(() => {this.loading = false});
  }

  protected onSave(): void {
    let sourceValue : T = this.source.getValue();
    if (this.source.getValue()) {
      let task: AppActionTask = null;
      if (!sourceValue.id) {
        task =  this.createAction(AppActionType.CREATING);
        task
        ._before(() => {this.loading = true}) 
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
        ._after(() => {this.loading = false});
      } else {
        if (sourceValue.id) {
          task =  this.createAction(AppActionType.CHANGING);
          task
          ._before(() => {this.loading = true}) 
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
          ._after(() => {this.loading = false});
        }
      }
      if (task) {
        this.runner(task);
      }
    }
  }

  ngAfterViewInit() {
    this.menuOption = this.menuService().getMenuOptionSelected();
  } 

  protected goTo(to: string, params? : any) {
    this.router.navigate([to, params]);
  }

  private menuService() : MenuService {
    return ServiceLocator.get(MenuService);
  }

  private messageService() : MessageService {
    return ServiceLocator.get(MessageService);
  }
}