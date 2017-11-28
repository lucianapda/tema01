import { SubscriptionFormDTO } from './../../../../sape/pages/register/subscription/subscription.form.dto';
import { SubscriptionDTO } from './../../../../model/subscription/subscription.dto';
import { SubscriptionActivityDTO } from './../../../../model/subscription/activity/subscription-activity.dto';
import {EventDTO} from '../../../../model/event/event.dto';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import { Component, Inject, ViewChild, AfterViewInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PersonDTO } from '../../../../model/person/person.dto';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EventActivityCrudService } from '../../../../service/crud/event/activity/event.activity.crud.service';
import { SubscriptionActivityCrudService } from '../../../../service/crud/subscription/activity/subscription.activity.crud.service';
 
declare var $: any;

@Component({
  selector: 'subscription-activity-search',
  template: `
    <div class="ui {{loading? 'loading disabled' : ''}} search selection dropdown" #dropdown>
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
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SubscriptionActivitySearchComponent), multi: true
  }]
})
export class SubscriptionActivitySearchComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('dropdown') dropdownComponent: ElementRef;

  private loading: boolean = false;
  private value: number = null;
  private results: SubscriptionActivityDTO[] = [];
  private propagateChange: Function = (date: Date) => { };
  private component: any;
  @Output() 
  private afterSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private objectOwner: SubscriptionFormDTO;

  ngAfterViewInit() {
    this.component = $(this.dropdownComponent.nativeElement).dropdown();
  }

  private onSelect(value: SubscriptionActivityDTO) : void {
      this.value = value.id;
      this.propagateChange([value.id]);
      this.afterSelect.emit([value, this.objectOwner]);
  }

  writeValue(value: number) {
    if(!value || !this.component) { return; }
    
    this.value = value;

    let params: Map<string, any> = new Map<string, any>();
    params.set("idEvent", this.objectOwner.idEvent);
    this.eventActivityCrudService().readByParams(params).then((values: Array<SubscriptionActivityDTO> | SubscriptionActivityDTO) => {
        if (values instanceof Array) {
            this.results = values;
        } else if (values instanceof Object) {
            this.results = [values];
        }
        if (this.value) {
            this.results.forEach((event: any) => {
                if (event.id == this.value) {
                    this.component.dropdown('refresh');
                    setTimeout(() => {
                        this.component.dropdown('set selected', event.place);
                    }, 1);
                }
            });
        }
    });
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  } 

  registerOnTouched(fn: any) { }

  private eventActivityCrudService() : SubscriptionActivityCrudService {
    return ServiceLocator.get(SubscriptionActivityCrudService);
  }
}