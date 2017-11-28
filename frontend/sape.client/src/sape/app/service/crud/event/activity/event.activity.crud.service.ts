import { EventActivityDTO } from './../../../../model/event/activity/event-activity.dto';
import { StringUtils } from './../../../../util/string/string.utils';
import { Router } from '@angular/router';
import { ListColumn, ListAction } from './../../../../components/list/list.component';

import {BaseCrudService} from "../../base.crud";
import {Injectable} from "@angular/core";
import {HttpService} from '../../../http/http.service';

/**
 * Serviço que disponibiliza métodos crud para o EventDTO
 * Created by Guilherme 
 */
@Injectable()
export class EventActivityCrudService extends BaseCrudService<EventActivityDTO> {

  constructor() {
    super('/events/activities');
  }
}