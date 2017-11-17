import { StringUtils } from './../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER, SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_EVENTS_EDIT, SAPE_PAGES_REGISTER_SUBSCRIPTIONS, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_EDIT } from './../../../app.routing.mapping';
import { Router } from '@angular/router';
import { ListColumn, ListAction } from './../../../components/list/list.component';

import {BaseCrudService} from "../base.crud";
import {EventDTO} from "../../../model/event/event.dto";
import {Injectable} from "@angular/core";
import {HttpService} from '../../http/http.service';
import { SubscriptionDTO } from '../../../model/subscription/subscription.dto';

/**
 * Serviço que disponibiliza métodos crud para o EventDTO
 * Created by Guilherme 
 */
@Injectable()
export class SubscriptionCrudService extends BaseCrudService<SubscriptionDTO> {

  constructor() {
    super('/subscriptions');
  }
}