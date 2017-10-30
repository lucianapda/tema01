import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Component, ElementRef, AfterViewInit, Output, EventEmitter, Input, Self, forwardRef } from '@angular/core';

declare var $: any;

export const CALENDAR_COMPONENT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};
 
@Component({
  selector: 'calendar',
  template: ` 
        <div class="ui calendar">
          <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input type="text" placeholder="{{placeholder}}" [(ngModel)]="valueDate" [value]="valueDate">
          </div>
        </div>
  `,
  providers: [CALENDAR_COMPONENT_CONTROL_VALUE_ACCESSOR]
})
export class CalendarComponent implements AfterViewInit, ControlValueAccessor {

  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() htmlElement: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();
  @Input() settings: CalendarOptions = {};
  @Input() valueDate: Date; 
  @Input() placeholder: String; 
  @Input() calendarType: string; 
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  private selectedDate: Date;
  
  constructor(private parentElement: ElementRef){
  }
  
 //get accessor
 get value(): any {
  return this.selectedDate;
};

//set accessor including call the onchange callback
set value(v: any) {
  if (v !== this.selectedDate) {
      this.selectedDate = v;
      this.change.emit(v);
  }
}

  ngAfterViewInit(): void {
    this.settings.onChange = (date: Date) => {this.writeValue(date)};
    this.settings.type = this.calendarType? this.calendarType : 'date';

    let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
    this.htmlElement.emit(calandarElement);
    
    $(calandarElement).calendar(this.settings);
  }
  
  writeValue (value: Date): void {
    if (value === this.selectedDate) {
      return;
    }
    this.change.emit(value);
    this.selectedDate = value;
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export interface CalendarOptions {
  type?: string;
  startCalendar?: HTMLElement;
  endCalendar?: HTMLElement;
  startMode?: string;
  ampm?: boolean;
  on?: string;
  minDate?: Date;
  maxDate?: Date;
  formatter?: Function;
  monthFirst?: boolean;
  inline?: boolean;
  onChange?: Function;
}