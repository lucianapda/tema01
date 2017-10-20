import {Component} from "@angular/core";
import {FormComponent} from '../../../../components/form/form.component';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {EventDTO} from '../../../../model/event/event.dto';
import {BaseCrudService} from '../../../../service/crud/base.crud';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'event-form',
  styleUrls: ['./event.form.component.css'],
  templateUrl: './event.form.component.html'
})
export class EventFormComponent extends FormComponent<EventDTO> {

  constructor(private eventCrudService: EventCrudService) {
    super();
  }

  protected getCrudService() : BaseCrudService<EventDTO> {
    return this.eventCrudService;
  }
}