import {ListService} from './list.service';
import {AppActionTask, AppActionType} from '../../core/task/action/app.action.task';
import {BaseDTO} from '../../model/base/base.dto';
import { Component, EventEmitter, Input, Output, OnInit, AfterViewChecked } from '@angular/core';
import {BaseComponent} from '../base/base.component';
import {LocalDataSource} from 'ng2-smart-table';


@Component({
  moduleId: module.id,
  selector: 'list' ,
  templateUrl: './list.component.html',
})
export class ListComponent<T extends BaseDTO> extends BaseComponent{

  // Events of load
  @Output() beforeLoad = new EventEmitter<T>();
  @Output() afterLoad = new EventEmitter<T>();
  // Events of edit
  @Output() onEdit = new EventEmitter<T>();
  @Output() beforeEdit = new EventEmitter<T>();
  @Output() afterEdit = new EventEmitter<T>();
  // Events of delete
  @Output() onDelete = new EventEmitter<T>();
  @Output() beforeDelete = new EventEmitter<T>();
  @Output() afterDelete = new EventEmitter<T>();
  // Serviço para leitura.
  @Input() service: ListService<T>;
  
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  
  values: T[] = []; 
  isFormatValue: Boolean = false;
  collectionSize: number = 10;
  maxSize: number = 10;
  pageSize: number = 10;
  selectedPage: number = 1;

  protected getActionInit() : AppActionTask {
    this.beforeLoad.subscribe(() => {
      this.values = [];
    });
    return this.createAction(AppActionType.READING)
      ._before(() => {this.beforeLoad.emit();})
      ._execute(() => {
        console.log("get")
        this.service.read().then((values: Array<T>) => {
            if (values instanceof Array) {
              values.forEach((t: T) => this.values.push(t))
            }
        });
      })._after(() => {this.afterLoad.emit();});
  }
}

export class TableColumn {
  constructor(name: string, index: number) {}
}

export class TableAction {
  constructor(name: string, index: number) {}
}