import { EventCrudService } from './../../../../service/crud/event/event.crud.service';
import { ServiceLocator } from './../../../../service/locator/service.locator';
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

  getTableService(): ListService<EventDTO> {
    return this.eventCrudService();
  }

  eventCrudService() {
    return ServiceLocator.get(EventCrudService);
  }

  protected getColumns() : {} {
    return {
        code: {
          title: 'Código'
        },
        place: {
          title: 'Local'
        },
        description: {
          title: 'Descrição'
        },
        dateStart: {
          title: 'Data de início'
        },
        dateEnd: {
          title: 'Data de fim'
        },
        dateStartSubscription: {
          title: 'Data de inicío da inscrição'
        },
        dateEndSubscription: {
          title: 'Data de fim da inscrição'
        },
        vacancy: {
          title: 'Quantidade de vagas'
        },
        waitingList: {
          title: 'Vaga de espera'
        }
      };
  }
}