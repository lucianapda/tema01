import { ServiceLocator } from './../../service/locator/service.locator';
import { MenuService } from './../../service/menu/menu.service';
import { HttpConfigMethod } from './../../service/http/http.config.method';
import {ListService} from './list.service';
import {AppActionTask, AppActionType} from '../../core/task/action/app.action.task';
import {BaseDTO} from '../../model/base/base.dto';
import { Component, EventEmitter, Input, Output, OnInit, AfterViewChecked } from '@angular/core';
import {BaseComponent} from '../base/base.component';
import {LocalDataSource} from 'ng2-smart-table';
import { MenuOption } from '../../service/menu/menu.option';

@Component({
  moduleId: module.id,
  selector: 'list' ,
  styleUrls: ['./list.component.css'],
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
  // Parametros de consulta
  @Input() params: Map<string, any>;
  // Colunas da lista
  @Input() columns: ListColumn[] = [];
  // Ações da lista
  @Input() actions: ListAction[] = [];
  // Ação novo
  @Input() newAction: ListAction;

  private values: T[] = []; 
  private isFormatValue: Boolean = false;
  private collectionSize: number = 10;
  private maxSize: number = 10;
  private pageSize: number = 10;
  private selectedPage: number = 1;
  private currentMenuOption: MenuOption;

  constructor() {
    super();
    this.currentMenuOption = this.menuService().getMenuOptionSelected();
  }

  protected getActionInit() : AppActionTask {
    this.beforeLoad.subscribe(() => {
      this.values = [];
    });
    return this.createAction(AppActionType.READING)
      ._before(() => {this.beforeLoad.emit();})
      ._execute(() => { 
        if(!this.params) {
          this.params = new Map<string, any>();
        }

        if (this.columns) {
          let columnsFormat: string = "";
          this.columns.forEach((column: ListColumn) =>{
            if (columnsFormat !== "") {
              columnsFormat += ", ";
            } 
            columnsFormat += column.name;
          });
          this.params.set('fields', columnsFormat);
        } 

        this.service.readByParams(this.params).then((values: Array<T>) => {
          if (values instanceof Array) {
            values.forEach((t: T) => this.values.push(t))
          }
        });
        
      })._after(() => {this.afterLoad.emit();});
  }

  private menuService() : MenuService {
    return ServiceLocator.get(MenuService);
  }

  private onNew() {
    this.newAction.execute();
  }
}

export class ListColumn {
  public name: string;
  public title: string; 
  public index: number; 
  public style: string;
  public hide: boolean;
  constructor(name: string, title: string, index: number, style: string, hide: boolean) {
    this.name = name;
    this.title = title;
    this.index = index;
    this.style = style;
    this.hide = hide;
  }
}

export class ListAction {
  private action: Function = (value?:any) => {};
  constructor(private name: string, private icon:string, private index: number, action: Function) {
    this.action = action;
  }

  public execute(value?: any) : void {
    this.action(value);
  }
}