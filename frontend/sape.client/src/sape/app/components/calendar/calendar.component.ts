import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Component, ElementRef, AfterViewInit, Output, EventEmitter, Input, Self, forwardRef, AfterViewChecked } from '@angular/core';

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
            <input type="text" placeholder="{{placeholder}}">
          </div>
        </div>
  `,
  providers: [CALENDAR_COMPONENT_CONTROL_VALUE_ACCESSOR]
})
export class CalendarComponent implements AfterViewInit, AfterViewChecked, ControlValueAccessor {

  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() htmlElement: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();
  @Input() settings: CalendarOptions = {
    formatter: {
      formatDate: (date: Date, settings: CalendarOptions) => {
          $.datepicker.formatDate('dd-MM-yy', date)
      }
    },
    onChange: (date: Date) => {
      this.writeValue(date)
    },
    text: {
      days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      now: 'Agora',
      am: 'AM',
      pm: 'PM'
    }
  };
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
  if (v instanceof Date && v !== this.selectedDate) {
      this.selectedDate = v;
      this.change.emit(v);
      let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
      $(calandarElement).calendar('set date', this.selectedDate, true);
  }
}

  ngAfterViewInit(): void {
    this.settings.type = this.calendarType? this.calendarType : 'date';
    let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
    $(calandarElement).calendar(this.settings);
  }

  ngAfterViewChecked(): void {
    let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
    // this.htmlElement.emit(calandarElement);
  }
  
  writeValue (value: Date): void { 
    if (value === this.selectedDate) {
      return;
    }
    if (value instanceof Date) {
      this.selectedDate = value;
      this.change.emit(this.selectedDate);
    } else {
      this.selectedDate = new Date(value);
      this.change.emit(this.selectedDate);
    }
    let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
    $(calandarElement).calendar('set date', this.selectedDate, true);
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
  formatter?: any;
  monthFirst?: boolean;
  inline?: boolean;
  onChange?: Function;
  text?: any;
  
}