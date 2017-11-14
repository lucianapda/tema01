import { SAPE_PAGES_REGISTER, SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_EVENTS_EDIT, SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES_EDIT } from './../../../../app.routing.mapping';
import { Router } from '@angular/router';
import { ListColumn, ListAction } from './../../../../components/list/list.component';

import {BaseCrudService} from "../../base.crud";
import {Injectable} from "@angular/core";
import {HttpService} from '../../../http/http.service';
import { EventActivityDTO } from '../../../../model/event/activity/event-activity.dto';

/**
 * Serviço que disponibiliza métodos crud para o EventDTO
 * Created by Guilherme 
 */
@Injectable()
export class EventActivityCrudService extends BaseCrudService<EventActivityDTO> {

  constructor(private router: Router) {
    super('/activities');
  }

  public getColumns() : Array<ListColumn> { 
    return [new ListColumn('code',  'Código', 0, 'sorted one wide'),
            new ListColumn('place', 'Local', 1, 'sorted four wide'),
            new ListColumn('description', 'Descrição', 2, 'sorted four wide'),
            new ListColumn('dateStart', 'Data de início', 3, 'sorted three wide'),
            new ListColumn('dateEnd', 'Data de fim', 4, 'sorted three wide')];
  }

  public getActions() : Array<ListAction> {
    return [new ListAction('edit', 'write', 0, (value: EventActivityDTO) => {
                if (value && value.id) {
                  this.router.navigate([SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES_EDIT.routingFull,  value.idEvent, +value.id]);
                } 
            }), 
            new ListAction('delete', 'trash outline', 1, (value: EventActivityDTO) => {
                super.deleteById(value.id);
            })]; 
  }
}