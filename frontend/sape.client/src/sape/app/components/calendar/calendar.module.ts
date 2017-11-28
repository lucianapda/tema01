import {DefaultCalendarOptions} from './options/default-calendar.options';
import {CalendarOptions} from './options/calendar.options';
import {CalendarComponent} from './calendar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskModule } from '../mask/mask.module';

@NgModule({
  imports: [SharedModule, NgxMaskModule],
  declarations: [CalendarComponent],
  providers: [{provide: CalendarOptions, useClass: DefaultCalendarOptions}],
  exports: [CalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarModule { }
