import { HttpConfigMethod } from './../../../../../service/http/http.config.method';
import { ActivatedRoute } from '@angular/router';
import { EventActivityCrudService } from './../../../../../service/crud/event/activity/event-activity.crud.service';
import { ServiceLocator } from './../../../../../service/locator/service.locator';
import {ListService} from '../../../../../components/list/list.service';
import { Component } from '@angular/core';
import { EventActivityDTO } from '../../../../../model/event/activity/event-activity.dto';
import { ParamMap } from '@angular/router/src/shared';

/**
 * Created by Guilherme on 03/04/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'event-activity-list',
  styleUrls: ['./event-activity.list.component.css'],
  templateUrl: './event-activity.list.component.html',
})
export class EventActivityListComponent {

  private idEvent: number;

  constructor(private activateRoute: ActivatedRoute) {
  }

  eventActivityCrudService() {
    return ServiceLocator.get(EventActivityCrudService);
  }

  getParams() :  Map<string, any> {
    return new Map([['idEvent', this.activateRoute.snapshot.paramMap.get('idEvent')]]);
  }

  protected getColumns() : {} {
    return {
        code: {
          title: 'Código'
        },
        description: {
          title: 'Descrição'
        },
        theme: {
          title: 'Tema'
        },
        dateStart: {
          title: 'Data de início'
        },
        dateEnd: {
          title: 'Data de fim'
        }
      };
  }
}