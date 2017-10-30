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

    private source: BehaviorSubject<T | Object>;
    public sourceForm: FormGroup = this.buildForm(this.formBuilder); 
    protected abstract getCrudService(): BaseCrudService<T>;
    protected abstract buildForm(formBuilder: FormBuilder): FormGroup;
    protected abstract bindForm(sourceForm: FormGroup, source: T | Object): void;
    protected abstract newSource(): T;
    protected loading: boolean = false;

    constructor(private route: ActivatedRoute, protected formBuilder: FormBuilder) {
      super();
    }

    protected getActionInit() : AppActionTask {
      return this.createAction(AppActionType.READING)
        ._before(() => {this.loading = true})
        ._execute(() => {
          this.getCrudService().read(this.route.snapshot.params['id']).then((values: Array<T>) => {
              if (values instanceof Array) {
                this.source = new BehaviorSubject(values[0]);
                console.log('retornou')
              } if (values instanceof Object) {
                this.source = new BehaviorSubject(values);
              } else {
                this.source = new BehaviorSubject(this.newSource());
                console.log('retornou não')
              }
              this.bindForm(this.sourceForm, this.source.getValue());
            });
          })._after(() => {this.loading = false});
    }
}
