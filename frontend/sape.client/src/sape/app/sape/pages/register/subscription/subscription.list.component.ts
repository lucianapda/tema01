import { Router } from '@angular/router';
import { StringUtils } from './../../../../util/string/string.utils';
import { Component } from '@angular/core';
import {ListService} from '../../../../components/list/list.service';
import {EventDTO} from '../../../../model/event/event.dto';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import {SubscriptionCrudService} from '../../../../service/crud/subscription/subscription.crud.service';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ListColumn, ListAction} from '../../../../components/list/list.component';
import { SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT } from '../../../../app.routing.mapping';

/**
 * Created by Guilherme on 03/04/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'subscription-list',
  styleUrls: ['./subscription.list.component.css'],
  templateUrl: './subscription.list.component.html',
})
export class SubscriptionListComponent {

  constructor(private router: Router) {}

  getTableService(): ListService<EventDTO> {
    return this.eventCrudService();
  }

  subscriptionCrudService() {
    return ServiceLocator.get(SubscriptionCrudService);
  }  

  eventCrudService() {
    return ServiceLocator.get(EventCrudService);
  }

  /**
    * Retorna as colunas que serão utilizadas
    */
    getColumns() : Array<ListColumn> {
      return [
        new ListColumn('id',  'ID', -1, '', true),
        new ListColumn('code',  'Código', 0, 'sorted one wide', false),
        new ListColumn('place', 'Local', 1, 'sorted four wide', false),
        new ListColumn('description', 'Descrição', 2, 'sorted four wide', false),
        new ListColumn('dateStart', 'Data de início', 3, 'sorted three wide', false),
        new ListColumn('dateEnd', 'Data de fim', 4, 'sorted three wide', false)
      ];
    }
     
    /**
    * Retorna as ações que serão utilizadas
    */
    getActions() : Array<ListAction> {
      return [new ListAction('edit', 'write', 0, (value: EventDTO) => {
        if (value && value.id) {
          this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT.routingFull, new Map<string, any>([[':id', value.id]]))]);
        } 
    })]
  };
}