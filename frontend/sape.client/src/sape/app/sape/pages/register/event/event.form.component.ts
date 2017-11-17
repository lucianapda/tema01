import { StringUtils } from './../../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER_EVENTS } from './../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);
  }
  
  protected eventCrudService() { 
    return ServiceLocator.get(EventCrudService);
  }

  protected getCrudService() : BaseCrudService<EventDTO> {
    return this.eventCrudService();
  }

  protected newSource() : EventDTO{
    return new EventDTO();
  }

  protected buildForm(formBuilder: FormBuilder, source: EventDTO) : FormGroup{
    return formBuilder.group({
      id: new FormControl(source.id),
      version: new FormControl(source.version),
      code: new FormControl(source.code),
      place: new FormControl(source.place),
      description: new FormControl(source.description),
      dateStart: new FormControl(source.dateStart),
      dateEnd: new FormControl(source.dateEnd),
      dateStartSubscription: new FormControl(source.dateStartSubscription),
      dateEndSubscription: new FormControl(source.dateEndSubscription),
      vacancy: new FormControl(source.vacancy),
      waitingList: new FormControl(source.waitingList),
      idUser: new FormControl(source.idUser)
    }); 
  }

  protected bindForm(sourceForm: FormGroup, source: EventDTO): void  {
    sourceForm.setValue({
      id: source.id,
      version: source.version,
      code: source.code,
      place: source.place, 
      description: source.description,
      dateStart: source.dateStart,
      dateEnd: source.dateEnd,
      dateStartSubscription: source.dateStartSubscription,
      dateEndSubscription: source.dateEndSubscription,
      vacancy: source.vacancy,
      waitingList: source.waitingList,
      idUser: source.idUser 
    });
  }

  protected onCancel() : void {
    this.goTo([SAPE_PAGES_REGISTER_EVENTS.routingFull]);
  }
}