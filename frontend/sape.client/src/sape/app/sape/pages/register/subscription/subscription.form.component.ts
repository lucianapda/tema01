import { PersonDTO } from './../../../../model/person/person.dto';
import { ModalControl } from './../../../../components/modal/modal.control';
import { ModalComponent } from './../../../../components/modal/modal.component';
import { SubscriptionDTO } from './../../../../model/subscription/subscription.dto';
import { PersonCrudService } from './../../../../service/crud/person/person.crud.service';
import { EventDTO } from './../../../../model/event/event.dto';
import {AppActionTask, AppActionType} from '../../../../core/task/action/app.action.task';
import { StringUtils } from './../../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_SUBSCRIPTIONS } from './../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormComponent} from '../../../../components/form/form.component';
import {SubscriptionCrudService} from '../../../../service/crud/subscription/subscription.crud.service';
import {BaseCrudService} from '../../../../service/crud/base.crud';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventCrudService } from '../../../../service/crud/event/event.crud.service';
import { SubscriptionFormDTO } from './subscription.form.dto';
import { BaseDTO } from '../../../../model/base/base.dto';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DefaultModalOptions } from '../../../../components/modal/default-modal.options';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'subscription-form',
  styleUrls: ['./subscription.form.component.css'],
  templateUrl: './subscription.form.component.html'
})
export class SubscriptionFormComponent extends FormComponent<BaseDTO> implements ModalControl<SubscriptionFormDTO> {

  @ViewChild(ModalComponent) componentModal: ModalComponent<SubscriptionFormDTO>;

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);
  }
  
  protected eventCrudService() { 
    return ServiceLocator.get(EventCrudService);
  }

  protected personCrudService() { 
    return ServiceLocator.get(PersonCrudService);
  }

  protected subscriptionCrudService() { 
    return ServiceLocator.get(SubscriptionCrudService);
  }

  protected getCrudService() : BaseCrudService<SubscriptionDTO> {
    return this.subscriptionCrudService();
  }

  protected newSource() : SubscriptionFormDTO{
    return new SubscriptionFormDTO(); 
  }

  protected buildForm(formBuilder: FormBuilder, source: SubscriptionFormDTO) : FormGroup{
    return formBuilder.group({
      currentSubscription: formBuilder.group({
        id: new FormControl(source.currentSubscription.id),
        version: new FormControl(source.currentSubscription.version),
        code: new FormControl(source.currentSubscription.code),
        date: new FormControl(source.currentSubscription.date),
        idPerson: new FormControl(source.currentSubscription.idPerson),
        namePerson: new FormControl(source.currentSubscription.namePerson),
        activities: new FormControl(source.currentSubscription.activities)
      }),
      subscriptions: new FormControl(source.subscriptions),
      idEvent: new FormControl(source.idEvent),
    });  
  }

  protected bindForm(sourceForm: FormGroup, source: SubscriptionFormDTO): void  {
    sourceForm.setValue({
      currentSubscription: {
        id: source.currentSubscription.id,
        code: source.currentSubscription.code,
        version: source.currentSubscription.version,
        date: source.currentSubscription.date, 
        idPerson: source.currentSubscription.idPerson,
        namePerson: source.currentSubscription.namePerson,
        activities: source.currentSubscription.activities
      },
      idEvent: source.idEvent,
      subscriptions: source.subscriptions
    });
  }

  protected onCancel() : void {
    this.goTo([SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingFull]);
  }

  protected editAction(value: SubscriptionDTO) {
    (<SubscriptionFormDTO> this.source.getValue()).currentSubscription = value;
    this.bindForm(this.sourceForm, (<SubscriptionFormDTO> this.source.getValue()));
    this.componentModal.show(<SubscriptionFormDTO> this.source.getValue());
  }

  protected getActionInit() : AppActionTask {
    this.menuOption = super.menuService().getMenuOptionSelected();
    return this.createAction(AppActionType.READING)
      ._before(() => {this.loading = true}) 
      ._execute(() => { 
        this.refresh();
      });
  }

  getModalApprove(value: SubscriptionFormDTO) : boolean {
    this.onSave();
    return true
  }

  getModalDeny(value: SubscriptionFormDTO) : boolean {
    return true
  }

  setModalValue(value: SubscriptionFormDTO) : void {}

  getModalValue() : SubscriptionFormDTO {
    return <SubscriptionFormDTO> this.source.getValue();
  }

  afterSelected(person: PersonDTO) {
    this.sourceForm.controls['name'].setValue(person.name);
  }

  private onNew() {
    this.editAction(new SubscriptionDTO())
  }

  private setNamePerson(personDTO : PersonDTO, currentSubscription: SubscriptionDTO) {
    currentSubscription.namePerson = personDTO.name;
  }

  protected onSave(): void {
    let sourceValue : SubscriptionFormDTO = <SubscriptionFormDTO>this.source.getValue();
    if (sourceValue) {
      let task: AppActionTask = null;
      if (!sourceValue.currentSubscription.id) {
        task =  this.createAction(AppActionType.CREATING);
        task
        ._before(() => {this.loading = true}) 
        ._execute(() => {
          this.getCrudService().create(sourceValue.currentSubscription).then(() => {
            this.refresh(); 
          });
        })
        ._after(() => { this.refresh(); this.loading = false; });
      } else if (sourceValue.currentSubscription.id) {
          task =  this.createAction(AppActionType.UPDATING);
          task
          ._before(() => {this.loading = true}) 
          ._execute(() => {
            this.getCrudService().update(sourceValue.currentSubscription).then(() => {
              this.refresh(); 
            });
          })
          ._after(() => { this.loading = false; });
      }
      if (task) {
        this.runner(task);
      }
    }
  }

  private refresh() : void {
    if (!this.source) {
      let newSource = new SubscriptionFormDTO();
      let idEvent: number = this.route.snapshot.params['id'];
      newSource.idEvent = idEvent;
    }

    (<SubscriptionFormDTO> this.source.getValue()).subscriptions = [];
    
    let params: Map<string, any> = new Map<string, any>();
    this.getCrudService().readByParams(params).then((values: Array<SubscriptionDTO> | SubscriptionDTO) => {
        if (values instanceof Array) {
          (<SubscriptionFormDTO> this.source.getValue()).subscriptions = values;
        } if (values instanceof SubscriptionDTO) {
          (<SubscriptionFormDTO> this.source.getValue()).subscriptions = [<SubscriptionDTO> values];
        } else {
          (<SubscriptionFormDTO> this.source.getValue()).currentSubscription = new SubscriptionDTO();
        }
        this.originalSource = this.source.getValue();
        this.bindForm(this.sourceForm, (<SubscriptionFormDTO> this.source.getValue()));
        this.sourceForm.valueChanges.subscribe((value: SubscriptionFormDTO) => {this.source.next(value)});
        this.loading = false
      });
  }
}