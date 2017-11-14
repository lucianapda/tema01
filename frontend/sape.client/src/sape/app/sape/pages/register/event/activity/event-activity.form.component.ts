import { SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES } from './../../../../../app.routing.mapping';
import { SAPE_PAGES_REGISTER_EVENTS } from './../../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormComponent} from '../../../../../components/form/form.component';
import {BaseCrudService} from '../../../../../service/crud/base.crud';
import { EventActivityDTO } from '../../../../../model/event/activity/event-activity.dto';
import { EventActivityCrudService } from '../../../../../service/crud/event/activity/event-activity.crud.service';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'event-activity-form',
  styleUrls: ['./event-activity.form.component.css'],
  templateUrl: './event-activity.form.component.html'
})
export class EventActivityFormComponent extends FormComponent<EventActivityDTO> {

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);
  }
  
  protected eventActivityCrudService() { 
    return ServiceLocator.get(EventActivityCrudService);
  }

  protected getCrudService() : BaseCrudService<EventActivityDTO> {
    return this.eventActivityCrudService();
  }

  protected newSource() : EventActivityDTO{
    return new EventActivityDTO();
  }

  protected buildForm(formBuilder: FormBuilder, source: EventActivityDTO) : FormGroup{
    return formBuilder.group({
      id: new FormControl(source.id),
      version: new FormControl(source.version),
      code: new FormControl(source.code),
      description: new FormControl(source.description), 
      speaker: new FormControl(source.speaker),
      theme: new FormControl(source.theme),
      dateStart: new FormControl(source.dateStart),
      dateEnd: new FormControl(source.dateEnd),
      vacancy: new FormControl(source.vacancy),
      place: new FormControl(source.place),
      idEvent: new FormControl(source.idEvent)
    }); 
  }

  protected bindForm(sourceForm: FormGroup, source: EventActivityDTO): void  {
    sourceForm.setValue({
      id: source.id,
      version: source.version,
      code: source.code,
      description: source.description, 
      speaker: source.speaker,
      theme: source.theme,
      dateStart: source.dateStart,
      dateEnd: source.dateEnd,
      vacancy: source.vacancy,
      place: source.place,
      idEvent: source.idEvent
    });
  }

  protected onCancel() : void {
    this.goTo(SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES.routingFull);
  }
}