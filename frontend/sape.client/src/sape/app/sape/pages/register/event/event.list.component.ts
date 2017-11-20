import { Router } from '@angular/router';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ListColumn, ListAction} from '../../../../components/list/list.component';
import {StringUtils} from '../../../../util/string/string.utils';
import {SAPE_PAGES_REGISTER_EVENTS_EDIT} from '../../../../app.routing.mapping';
import {EventDTO} from '../../../../model/event/event.dto';
import {ListService} from '../../../../components/list/list.service';
import { Component } from '@angular/core';

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

  constructor(private router: Router) {}

  private getTableService(): ListService<EventDTO> {
    return this.eventCrudService();
  }

  private eventCrudService() {
    return ServiceLocator.get(EventCrudService);
  }  
  
  private getColumns() : Array<ListColumn> { 
    return [new ListColumn('code',  'Código', 0, 'sorted one wide'),
            new ListColumn('place', 'Local', 1, 'sorted four wide'),
            new ListColumn('description', 'Descrição', 2, 'sorted four wide'),
            new ListColumn('dateStart', 'Data de início', 3, 'sorted three wide'),
            new ListColumn('dateEnd', 'Data de fim', 4, 'sorted three wide')];
  }

  private getActions() : Array<ListAction> {
    return [new ListAction('edit', 'write', 0, (value: EventDTO) => {
                if (value && value.id) {
                  this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, new Map<string, any>([[':id', value.id]]))]);
                } 
            }), 
            new ListAction('delete', 'trash outline', 1, (value: EventDTO) => {
                this.eventCrudService().deleteById(value.id);
            })]; 
  }

  private getNewAction() : ListAction {
    return new ListAction('new', 'add', -1, () => {
      this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_EVENTS_EDIT.routingFull, new Map<string, any>([['/:id', '']]))]);
    });
  }
}