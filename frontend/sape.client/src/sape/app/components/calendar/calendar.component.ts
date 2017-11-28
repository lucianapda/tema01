import {CalendarOptions} from './options/calendar.options';
import { Component, Inject, ViewChild, AfterViewInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'calendar',
  template: `
    <div class="ui calendar" #calendar>
      <div class="ui input left icon">
        <i class="calendar icon"></i>
        <input mask="00/00/0000" (change)="dateTabCompletion($event)" type="text"  placeholder="{{placeholder}}">
      </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CalendarComponent), multi: true
  }]
})
export class CalendarComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('calendar') componentRoot: ElementRef;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;

  $control: any;
  customOptions: CalendarOptions;

  private propagateChange: Function = (date: Date) => { };

  get options() {
    return Object.assign({},
                         this.customOptions,
                         { type: this.type },
                         { minDate: this.minDate },
                         { maxDate: this.maxDate },
                         { onChange: (date: Date) => this.emit(date) },
                         { 
                           text: {
                            days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            today: 'Hoje',
                            now: 'Agora',
                            am: 'AM',
                            pm: 'PM'
                          }
                        });
  }

  constructor(@Inject(CalendarOptions) options: CalendarOptions) {
    this.customOptions = options;
  }

  ngAfterViewInit() {
    this.init();
  }

  public init() {
    this.$control = $(this.componentRoot.nativeElement).calendar(this.options);
  }

  dateTabCompletion(evr: any) {
    if (this.options.type !== 'date') { return; }

    const parsePattern = /^(\d{2})(\/)?(\d{2})?(\/)?(\d{2}|\d{4})?$/;
    let matches = parsePattern.exec(evr.target.value);

    if(matches == null || (matches && matches.length !== 6)) { return; }

    let [, day, , month, , year]  = matches;
    
    let currentDate: Date = new Date();
    if (!day || day.length == 0) {
      day = currentDate.getUTCDate().toString();
    }
    if (!month || month.length == 0) {
      month = currentDate.getUTCMonth().toString();
    }
    if (!year || year.length == 0) {
      year = currentDate.getUTCFullYear().toString();
    }

    
    this.$control.calendar('set date', new Date(parseInt(year), parseInt(month)-1, parseInt(day)));
    this.propagateChange(this.$control.calendar('get date'));
  }

  emit(date: Date) { 
    if (!date || typeof date.getMonth !== 'function') { return; }

    if (this.options.type === 'date') {
      date.setHours(0, 0, 0, 0);
    } 

    this.propagateChange(new Date(date));
  }

  writeValue(dateTime: Date) {
    if(!this.$control) { return; }

    this.$control.calendar('set date', dateTime, true, false);
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  } 

  registerOnTouched(fn: any) { }
}