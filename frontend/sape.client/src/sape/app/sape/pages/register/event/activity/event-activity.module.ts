import { SharedModule } from './../../../../../shared/shared.module';
import { CalendarModule } from './../../../../../components/calendar/calendar.module';
import { ListModule } from './../../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { EventActivityFormComponent } from "./event-activity.form.component";
import { EventActivityListComponent } from "./event-activity.list.component";
import {routing} from "./event-activity.routing";

@NgModule({
  imports:      [ routing, ListModule, CalendarModule, SharedModule ],
  declarations: [ EventActivityListComponent, EventActivityFormComponent],
  bootstrap:    [ EventActivityListComponent ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventActivityModule { }
