import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AppActionTask, AppActionType } from './../../core/task/action/app.action.task';
import {BaseComponent} from '../base/base.component';
import {BaseDTO} from '../../model/base/base.dto';
import {BaseCrudService} from '../../service/crud/base.crud';

export abstract class FormComponent<T extends BaseDTO > extends BaseComponent {

    private source: BehaviorSubject<T>;
    public sourceForm: FormGroup = this.buildForm(this.formBuilder, this.newSource());
    protected abstract getCrudService(): BaseCrudService<T>;
    protected abstract buildForm(formBuilder: FormBuilder, source: T): FormGroup;
    protected abstract bindForm(sourceForm: FormGroup, source: T): void;
    
    protected abstract newSource(): T;
    protected loading: boolean = false;

    constructor(private route: ActivatedRoute, protected formBuilder: FormBuilder) {
      super();
    }

    protected getActionInit() : AppActionTask {
      return this.createAction(AppActionType.READING)
        ._before(() => {this.loading = true}) 
        ._execute(() => {
          this.getCrudService().read(this.route.snapshot.params['id']).then((values: Array<T> | T) => {
              if (values instanceof Array) {
                this.source = new BehaviorSubject(values[0]);
              } if (values instanceof Object) {
                this.source = new BehaviorSubject(<T> values);
              } else {
                this.source = new BehaviorSubject(this.newSource());
              }
              this.sourceForm = this.buildForm(this.formBuilder, this.source.getValue());
            });
          })._after(() => {this.loading = false});
    }

    protected onSave(): void {
      if (this.source.getValue()) {
        let task: AppActionTask = null;
        if (!this.source.getValue().id) {
          task =  this.createAction(AppActionType.CREATING);
          task
          ._before(() => {this.loading = true}) 
          ._execute(() => {
            this.getCrudService().create(this.source.getValue()).then((values: Array<T> | T) => {
              if (values instanceof Array) {
                this.source = new BehaviorSubject(values[0]);
              } if (values instanceof Object) {
                this.source = new BehaviorSubject(<T> values);
              } else {
                this.source = new BehaviorSubject(this.newSource());
              }
              this.sourceForm = this.buildForm(this.formBuilder, this.source.getValue());
            });
          })
          ._after(() => {this.loading = false});
        } else {
          if (this.source.getValue().id) {
            task =  this.createAction(AppActionType.CHANGING);
            task
            ._before(() => {this.loading = true}) 
            ._execute(() => {
              this.getCrudService().create(this.source.getValue()).then((values: Array<T> | T) => {
                if (values instanceof Array) {
                  this.source = new BehaviorSubject(values[0]);
                } if (values instanceof Object) {
                  this.source = new BehaviorSubject(<T> values);
                } else {
                  this.source = new BehaviorSubject(this.newSource());
                }
                this.sourceForm = this.buildForm(this.formBuilder, this.source.getValue());
              });
            })
            ._after(() => {this.loading = false});
          }
        }
      }
    }

    protected onCancel() : void  {

    }
}
