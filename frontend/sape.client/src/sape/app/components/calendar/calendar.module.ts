import { CalendarComponent } from './calendar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [CalendarComponent],
  providers: [],
  exports: [CalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarModule { }
