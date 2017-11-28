import { Router } from '@angular/router';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ListComponent, ListColumn, ListAction} from '../../../../components/list/list.component';
import {StringUtils} from '../../../../util/string/string.utils';
import {SAPE_PAGES_REGISTER_EVENTS_EDIT} from '../../../../app.routing.mapping';
import {EventDTO} from '../../../../model/event/event.dto';
import {ListService} from '../../../../components/list/list.service';
import { Component, ViewChild } from '@angular/core';
import { MessageService } from '../../../../service/message/message.service';

/** 
 * Created by Guilherme on 03/04/2017.
 */
@Component({
  moduleId: module.id, 
  selector: 'event-list',
  styleUrls: ['./event.list.component.css'],
  templateUrl: './event.list.component.html',
})
export class EventListComponent {

  @ViewChild(ListComponent) private list: ListComponent<EventDTO>;

  constructor(private router: Router) {}

  private getTableService(): ListService<EventDTO> {
    return this.eventCrudService();
  }

  private eventCrudService() {
    return ServiceLocator.get(EventCrudService);
  }  
  
  private getColumns() : Array<ListColumn> { 
    return [new ListColumn('id',  'ID', -1, 'one wide', true),
            new ListColumn('code',  'Código', 0, 'sorted one wide', false),
            new ListColumn('place', 'Local', 1, 'sorted four wide', false),
            new ListColumn('description', 'Descrição', 2, 'sorted four wide', false),
            new ListColumn('dateStart', 'Data de início', 3, 'sorted three wide', false),
            new ListColumn('dateEnd', 'Data de fim', 4, 'sorted three wide', false)];
  }

  private getActions() : Array<ListAction> {
    return [new ListAction('edit', 'write', 0, (value: EventDTO) => {
                if (value && value.id) {
                  this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, new Map<string, any>([[':id', value.id]]))]);
                } 
            }), 
            new ListAction('delete', 'trash outline', 1, (value: EventDTO) => {
                this.eventCrudService().deleteById(value.id).then((result: any) => {
                  if (result == value.id) {
                    this.list.refresh();
                    this.messageService().success("", "Registro excluído com sucesso!");
                  }
                });
            })]; 
  }

  private getNewAction() : ListAction {
    return new ListAction('new', 'add', -1, () => {
      this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, new Map<string, any>([['/:id', '']]))]);
    });
  }

  protected messageService() : MessageService {
    return ServiceLocator.get(MessageService);
  }
}