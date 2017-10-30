import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  // sourceForm: FormGroup = this.buildForm(this.formBuilder); 

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

  protected buildForm(formBuilder: FormBuilder) : FormGroup{
    var f: FormGroup = formBuilder.group({
      place: formBuilder.control('oi', Validators.required),
      description: formBuilder.control('', Validators.required),
      dateStart: formBuilder.control(new Date(), Validators.required),
      dateEnd: formBuilder.control('', Validators.required),
      dateStartSubscription: formBuilder.control('', Validators.required),
      dateEndSubscription: formBuilder.control('', Validators.required),
      vacancy: formBuilder.control('', Validators.required),
      waitingList: formBuilder.control('', Validators.required),
    }); 
    // this.bindForm(f, this.newSource());
    return f;
  }

  protected bindForm(sourceForm: FormGroup, source: EventDTO): void  {
    sourceForm.setValue({
      place: source.place,
      description: source.description,
      dateStart: source.dateStart,
      dateEnd: source.dateEnd,
      dateStartSubscription: source.dateStartSubscription,
      dateEndSubscription: source.dateEndSubscription,
      vacancy: source.vacancy,
      waitingList: source.waitingList
    });
  }
}