import {EventDTO} from '../../../../model/event/event.dto';
import {EventCrudService} from '../../../../service/crud/event/event.crud.service';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import { Component, Inject, ViewChild, AfterViewInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PersonDTO } from '../../../../model/person/person.dto';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
 
declare var $: any;

@Component({
  selector: 'event-activity-search',
  template: `
    <div class="ui {{loading? 'loading disabled' : ''}} search selection dropdown">
        <input name="tags" type="event">
        <i class="dropdown icon"></i>
        <div class="default text">Selecione o event...</div>
        <div class="menu">
            <div *ngFor="let event of results" class="item" (click)="onSelect(event)">
                {{event.place}}
            </div>
        </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EventActivitySearchComponent), multi: true
  }]
})
export class EventActivitySearchComponent implements AfterViewInit, ControlValueAccessor {

  private loading: boolean = false;
  private value: number = null;
  private results: EventDTO[] = [];
  private propagateChange: Function = (date: Date) => { };
  private component: any;
  @Output() 
  private afterSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private objectOwner: Object;

  ngAfterViewInit() {
    this.component = $('.ui.dropdown').dropdown({});
  }

  private onSelect(value: EventDTO) : void {
      this.value = value.id;
      this.propagateChange(value.id);
      this.afterSelect.emit([value, this.objectOwner]);
  }

  writeValue(value: number) {
    if(!value || !this.component) { return; }
    
    this.value = value;

    let params: Map<string, any> = new Map<string, any>();
    this.eventCrudService().readByParams(params).then((values: Array<EventDTO> | EventDTO) => {
        if (values instanceof Array) {
            this.results = values;
        } else if (values instanceof Object) {
            this.results = [values];
        }
        this.results.forEach((event: any) => {
            if (event.id == this.value) {
                this.component.dropdown('refresh');
                setTimeout(() => {
                    this.component.dropdown('set selected', event.place);
                }, 1);
            }
        });
    });
    
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  } 

  registerOnTouched(fn: any) { }

  private eventCrudService() : EventCrudService {
    return ServiceLocator.get(EventCrudService);
  }
}