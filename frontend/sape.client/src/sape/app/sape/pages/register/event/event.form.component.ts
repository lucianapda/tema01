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

  constructor(route: ActivatedRoute, formBuilder: FormBuilder) {
    super(route, formBuilder);
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
      place: new FormControl(source.place),
      description: new FormControl(source.description),
      dateStart: new FormControl(new Date(source.dateStart)),
      dateEnd: new FormControl(new Date(source.dateEnd)),
      dateStartSubscription: new FormControl(new Date(source.dateStartSubscription)),
      dateEndSubscription: new FormControl(new Date(source.dateEndSubscription)),
      vacancy: new FormControl(source.vacancy),
      waitingList: new FormControl(source.waitingList)
    }); 
  }

  protected bindForm(sourceForm: FormGroup, source: EventDTO): void  {
    sourceForm.setValue({
      place: source.place,
      description: source.description,
      dateStart: new Date(source.dateStart),
      dateEnd: new Date(source.dateEnd),
      dateStartSubscription: new Date(source.dateStartSubscription),
      dateEndSubscription: new Date(source.dateEndSubscription),
      vacancy: source.vacancy,
      waitingList: source.waitingList
    });
  }
}