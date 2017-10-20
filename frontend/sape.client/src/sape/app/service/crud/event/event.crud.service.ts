
import {BaseCrudService} from "../base.crud";
import {EventDTO} from "../../../model/event/event.dto";
import {Injectable} from "@angular/core";
import {HttpService} from '../../http/http.service';

/**
 * Serviço que disponibiliza métodos crud para o EventDTO
 * Created by Guilherme 
 */
@Injectable()
export class EventCrudService extends BaseCrudService<EventDTO> {

  constructor() {
    super()
  }

  protected getPatch(): string {
    return "/events";
  }
}