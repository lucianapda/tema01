import { SubscriptionActivityDTO } from './../../../../model/subscription/activity/subscription-activity.dto';
import { StringUtils } from './../../../../util/string/string.utils';
import { Router } from '@angular/router';
import { ListColumn, ListAction } from './../../../../components/list/list.component';

import {BaseCrudService} from "../../base.crud";
import {Injectable} from "@angular/core";
import {HttpService} from '../../../http/http.service';

/**
 * Serviço que disponibiliza métodos crud para o SubscriptionDTO
 * Created by Guilherme 
 */
@Injectable()
export class SubscriptionActivityCrudService extends BaseCrudService<SubscriptionActivityDTO> {

  constructor() {
    super('/subscriptions/activities');
  }
}