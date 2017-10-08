import { AppActionTask, AppActionType } from './../../core/task/action/app.action.task';
import {BaseDTO} from '../../model/base/base.dto';
import {Component} from '@angular/core';
import {ListService} from './list.service';
import {BaseComponent} from '../base/base.component';
import {LocalDataSource} from 'ng2-smart-table';


@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ["./list.component.css"]
})
 export abstract class ListComponent<T extends BaseDTO> extends BaseComponent {
    public static HTML_URL= "app/components/list/list.component.html"; 

    settings = {
      add: {
        addButtonContent: 'Adicionar',
        createButtonContent: 'Novo',
        cancelButtonContent: 'Cancelar',
      },
      edit: {
        editButtonContent: 'Editar',
        saveButtonContent: 'Salvar',
        cancelButtonContent: 'Cancelar',
      },
      delete: {
        deleteButtonContent: 'Deletar',
        confirmDelete: true
      },
      columns: this.getColumns()
    };
    source = new LocalDataSource();

    protected getActionInit() : AppActionTask {
      return this.createAction(AppActionType.READING)._execute(() => {
          this.getListService().read().then((values: Array<T>) => {
              if (values instanceof Array) {
                values.forEach((t: T) => this.getSource().add(t))
                this.getSource().refresh();
              }
          });
      })
    }
    
    protected getSource() : LocalDataSource{
      return this.source;
    }
    
    protected abstract getColumns(): {};
    protected abstract getListService(): ListService<T>;
}
