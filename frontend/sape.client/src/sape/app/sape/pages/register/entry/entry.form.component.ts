import { SubscriptionActivityDTO } from './../../../../model/subscription/activity/subscription-activity.dto';
import { PersonDTO } from './../../../../model/person/person.dto';
import { ModalControl } from './../../../../components/modal/modal.control';
import { ModalComponent } from './../../../../components/modal/modal.component';
import { EntryDTO } from './../../../../model/entry/entry.dto';
import { PersonCrudService } from './../../../../service/crud/person/person.crud.service';
import { EventDTO } from './../../../../model/event/event.dto';
import {AppActionTask, AppActionType} from '../../../../core/task/action/app.action.task';
import { StringUtils } from './../../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_SUBSCRIPTIONS, SAPE_PAGES_REGISTER_ENTRIES } from './../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormComponent} from '../../../../components/form/form.component';
import {EntryCrudService} from '../../../../service/crud/entry/entry.crud.service';
import {BaseCrudService} from '../../../../service/crud/base.crud';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventCrudService } from '../../../../service/crud/event/event.crud.service';
import { EntryFormDTO } from './entry.form.dto';
import { BaseDTO } from '../../../../model/base/base.dto';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DefaultModalOptions } from '../../../../components/modal/default-modal.options';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'entry-form',
  styleUrls: ['./entry.form.component.css'],
  templateUrl: './entry.form.component.html'
})
export class EntryFormComponent extends FormComponent<BaseDTO> implements ModalControl<EntryFormDTO> {

  @ViewChild(ModalComponent) componentModal: ModalComponent<EntryFormDTO>;

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);
  }
  
  protected eventCrudService() { 
    return ServiceLocator.get(EventCrudService);
  }

  protected personCrudService() { 
    return ServiceLocator.get(PersonCrudService);
  }

  protected entryCrudService() { 
    return ServiceLocator.get(EntryCrudService);
  }

  protected getCrudService() : BaseCrudService<EntryDTO> {
    return this.entryCrudService();
  }

  protected newSource() : EntryFormDTO{
    return new EntryFormDTO(); 
  }

  protected buildForm(formBuilder: FormBuilder, source: EntryFormDTO) : FormGroup{
    return formBuilder.group({
      currentEntry: formBuilder.group({
        id: new FormControl(source.currentEntry.id),
        version: new FormControl(source.currentEntry.version),
        code: new FormControl(source.currentEntry.code),
        dateEntry: new FormControl(source.currentEntry.dateEntry),
        dateDeparture: new FormControl(source.currentEntry.dateDeparture),
        idSubscriptionActivity: new FormControl(source.currentEntry.idSubscriptionActivity),
      }),
      entries: new FormControl(source.entries),
      idEvent: new FormControl(source.idEvent),
    });  
  }

  protected bindForm(sourceForm: FormGroup, source: EntryFormDTO): void  {
    sourceForm.setValue({
      currentEntry: {
        id: source.currentEntry.id,
        code: source.currentEntry.code,
        version: source.currentEntry.version,
        dateEntry: source.currentEntry.dateEntry, 
        dateDeparture: source.currentEntry.dateDeparture, 
        idSubscriptionActivity: source.currentEntry.idSubscriptionActivity
      },
      idEvent: source.idEvent,
      entries: source.entries
    });
  }

  protected onCancel() : void {
    this.goTo([SAPE_PAGES_REGISTER_ENTRIES.routingFull]);
  }

  protected editAction(value: EntryDTO) {
    (<EntryFormDTO> this.source.getValue()).currentEntry = value;
    this.bindForm(this.sourceForm, (<EntryFormDTO> this.source.getValue()));
    this.componentModal.show(<EntryFormDTO> this.source.getValue());
  }

  protected getActionInit() : AppActionTask {
    this.menuOption = super.menuService().getMenuOptionSelected();
    return this.createAction(AppActionType.READING)
      ._before(() => {this.loading = true}) 
      ._execute(() => { 
        this.refresh();
      });
  }

  getModalApprove(value: EntryFormDTO) : boolean {
    this.onSave();
    return true
  }

  getModalDeny(value: EntryFormDTO) : boolean {
    return true
  }

  setModalValue(value: EntryFormDTO) : void {}

  getModalValue() : EntryFormDTO {
    return <EntryFormDTO> this.source.getValue();
  }

  afterSelected(person: PersonDTO) {
    this.sourceForm.controls['name'].setValue(person.name);
  }

  private onNew() {
    this.editAction(new EntryDTO())
  }

  private setNamePerson(activityDTO : SubscriptionActivityDTO, currentEntry: EntryDTO) {
    currentEntry.descActivity = activityDTO.descActivity;
    currentEntry.namePerson = activityDTO.namePerson;
  }

  protected onSave(): void {
    let sourceValue : EntryFormDTO = <EntryFormDTO>this.source.getValue();
    if (sourceValue) {
      let task: AppActionTask = null;
      if (!sourceValue.currentEntry.id) {
        task =  this.createAction(AppActionType.CREATING);
        task
        ._before((v?: any): Promise<any> | any | void => {this.loading = true}) 
        ._execute((v?: any): Promise<any> | any | void => {
          return this.getCrudService().create(sourceValue.currentEntry).then(() => {
            this.refresh(); 
          });
        })
        ._after((v?: any): Promise<any> | any | void => { this.refresh(); this.loading = false; });
      } else if (sourceValue.currentEntry.id) {
          task =  this.createAction(AppActionType.UPDATING);
          task
          ._before((v?: any): Promise<any> | any | void => {this.loading = true}) 
          ._execute((v?: any): Promise<any> | any | void => {
            return this.getCrudService().update(sourceValue.currentEntry).then(() => {
              this.refresh(); 
            });
          })
          ._after((v?: any): Promise<any> | any | void => { this.loading = false; });
      }
      if (task) {
        this.runner(task);
      }
    }
  }

  private refresh() : void {
    if (!this.source) {
      let newSource = new EntryFormDTO();
      let idEvent: number = this.route.snapshot.params['id'];
      newSource.idEvent = idEvent;
    }

    (<EntryFormDTO> this.source.getValue()).entries = [];
    
    let params: Map<string, any> = new Map<string, any>();
    this.getCrudService().readByParams(params).then((values: Array<EntryDTO> | EntryDTO) => {
        if (values instanceof Array) {
          (<EntryFormDTO> this.source.getValue()).entries = values;
        } if (values instanceof EntryDTO) {
          (<EntryFormDTO> this.source.getValue()).entries = [<EntryDTO> values];
        } else {
          (<EntryFormDTO> this.source.getValue()).currentEntry = new EntryDTO();
        }
        this.originalSource = this.source.getValue();
        this.bindForm(this.sourceForm, (<EntryFormDTO> this.source.getValue()));
        this.sourceForm.valueChanges.subscribe((value: EntryFormDTO) => {this.source.next(value)});
        this.loading = false
      });
  }
}