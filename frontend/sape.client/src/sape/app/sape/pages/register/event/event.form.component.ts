import { ModalControl } from './../../../../components/modal/modal.control';
import { StringUtils } from './../../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER_EVENTS } from './../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../service/locator/service.locator';
import { Component, ViewChild} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormComponent} from '../../../../components/form/form.component';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {EventDTO} from '../../../../model/event/event.dto';
import {BaseCrudService} from '../../../../service/crud/base.crud';
import { EventActivityDTO } from '../../../../model/event/activity/event-activity.dto';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { Location } from '@angular/common';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'event-form',
  styleUrls: ['./event.form.component.css'],
  templateUrl: './event.form.component.html'
})
export class EventFormComponent extends FormComponent<EventDTO> implements ModalControl<EventActivityDTO> {

  @ViewChild(ModalComponent) componentModal: ModalComponent<EventActivityDTO>;

  private sourceEventActivityForm: FormGroup;
  private currentIndexEdit: number;

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router, private location: Location) {
    super(route, formBuilder, router);

    this.sourceEventActivityForm = formBuilder.group({
      id: new FormControl(null),
      version: new FormControl(null),
      idEvent: new FormControl(null),
      code: new FormControl(null, Validators.required), 
      description: new FormControl(null, Validators.required),
      speaker: new FormControl(null, Validators.required), 
      theme: new FormControl(null, Validators.required),
      dateStart: new FormControl(null, Validators.required), 
      dateEnd: new FormControl(null, Validators.required),
      vacancy: new FormControl(null, Validators.required), 
      place: new FormControl(null, Validators.required),
    });
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
      idUser: new FormControl(source.idUser),
      activities: new FormControl(source.activities),
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
      idUser: source.idUser,
      activities: source.activities
    });
  }

  protected onCancel() : void {
    this.location.back();
  }

  protected afterSave() : void {
  };

  protected bindEventActivityForm(sourcePersonContactForm: FormGroup, sourceEventActivity: EventActivityDTO): void  {
    sourcePersonContactForm.setValue({
      id: sourceEventActivity.id,
      version: sourceEventActivity.version,
      idEvent: sourceEventActivity.idEvent,
      code: sourceEventActivity.code,
      description: sourceEventActivity.description,
      speaker: sourceEventActivity.speaker, 
      theme: sourceEventActivity.theme,
      dateStart: sourceEventActivity.dateStart, 
      dateEnd: sourceEventActivity.dateEnd,
      vacancy: sourceEventActivity.vacancy, 
      place: sourceEventActivity.place,
    });
  }

  private editAction(contact: EventActivityDTO, index: number) : void {
    this.bindEventActivityForm(this.sourceEventActivityForm, contact);
    this.currentIndexEdit = index;
    this.componentModal.show(contact);
  }

  private removeAction(index: number) : void {
    this.source.getValue().activities.splice(index, 1);
    this.bindForm(this.sourceForm, this.source.getValue());
  }

  /**
   * Retorna a ação que será executada quando o modal for aprovado.
   */
  getModalApprove(value: EventActivityDTO) : boolean {
    if (this.currentIndexEdit !== undefined) {
      this.source.getValue().activities.splice(this.currentIndexEdit, 1);
      this.currentIndexEdit = undefined;
    }
    this.source.getValue().activities.push(value);
    this.bindForm(this.sourceForm, this.source.getValue());
    return true;
  }
    
  /** 
   * Retorna a ação que será executada quando o modal for cancelado.
   */
  getModalDeny(value: EventActivityDTO) : boolean {
    return true; 
  }

  /**
   * Atirbui um valor ao controlador do modal.
   */
  setModalValue(value: EventActivityDTO) : void {}

  /**
   * Recupera o valor do controlador do modal.
   */
  getModalValue() : EventActivityDTO {
    return this.sourceEventActivityForm.getRawValue();
  }

  onEventActivityNew () {
    this.editAction(new EventActivityDTO(), undefined);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
    this.componentModal = undefined;
    this.sourceEventActivityForm.reset();
    this.currentIndexEdit = undefined;
  }
}