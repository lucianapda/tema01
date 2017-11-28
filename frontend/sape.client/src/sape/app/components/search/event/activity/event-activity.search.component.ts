import { SubscriptionFormDTO } from './../../../../sape/pages/register/subscription/subscription.form.dto';
import { SubscriptionDTO } from './../../../../model/subscription/subscription.dto';
import { EventActivityDTO } from './../../../../model/event/activity/event-activity.dto';
import {EventDTO} from '../../../../model/event/event.dto';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import { Component, Inject, ViewChild, AfterViewInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PersonDTO } from '../../../../model/person/person.dto';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EventActivityCrudService } from '../../../../service/crud/event/activity/event.activity.crud.service';
 
declare var $: any;

@Component({
  selector: 'event-activity-search',
  template: `
    <div class="ui {{loading? 'loading disabled' : ''}} multiple search selection dropdown" #dropdown>
        <input name="tags" type="event">
        <i class="dropdown icon"></i>
        <div class="default text">Selecione a ativitidade...</div>
        <div class="menu">
            <div *ngFor="let event of results" class="item" (click)="onSelect(event)">
                {{event.description}}
            </div>
        </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EventActivitySearchComponent), multi: true
  }]
})
export class EventActivitySearchComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('dropdown') dropdownComponent: ElementRef;

  private loading: boolean = false;
  private values: number[] = null;
  private results: EventActivityDTO[] = [];
  private propagateChange: Function = (date: Date) => { };
  private component: any;
  @Output() 
  private afterSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private objectOwner: SubscriptionFormDTO;

  ngAfterViewInit() {
    this.component = $(this.dropdownComponent.nativeElement).dropdown();
  }

  private onSelect(value: EventActivityDTO) : void {
      this.values.push(value.id);
      this.propagateChange([value.id]);
      this.afterSelect.emit([value, this.objectOwner]);
  }

  writeValue(value: number[]) {
    if(!value || !this.component) { return; }
    
    this.values = value;

    let params: Map<string, any> = new Map<string, any>();
    params.set("idEvent", this.objectOwner.idEvent);
    this.eventActivityCrudService().readByParams(params).then((values: Array<EventActivityDTO> | EventActivityDTO) => {
        if (values instanceof Array) {
            this.results = values;
        } else if (values instanceof Object) {
            this.results = [values];
        }
        let descActivity: String[] = [];
        this.results.forEach((activity: any) => {
            this.values.forEach((idValue) => {
                if (activity.id == idValue) {
                    descActivity.push(activity.description);
                }
            }); 
        });
        this.component.dropdown('refresh');
        setTimeout(() => {
            this.component.dropdown('set selected', descActivity);
        }, 1);
    });
    
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  } 

  registerOnTouched(fn: any) { }

  private eventActivityCrudService() : EventActivityCrudService {
    return ServiceLocator.get(EventActivityCrudService);
  }
}