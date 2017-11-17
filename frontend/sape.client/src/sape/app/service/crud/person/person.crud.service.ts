import { StringUtils } from './../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER, SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_EVENTS_EDIT, SAPE_PAGES_REGISTER_PEOPLE_EDIT } from './../../../app.routing.mapping';
import { Router } from '@angular/router';
import { ListColumn, ListAction } from './../../../components/list/list.component';

import {BaseCrudService} from "../base.crud";
import {PersonDTO} from "../../../model/person/person.dto";
import {Injectable} from "@angular/core";
import {HttpService} from '../../http/http.service';

/**
 * Serviço que disponibiliza métodos crud para o PersonDTO
 * Created by Guilherme 
 */
@Injectable()
export class PersonCrudService extends BaseCrudService<PersonDTO> {

  constructor() {
    super('/people');
  }
}