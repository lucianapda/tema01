import { ModalModule } from './../../../../components/modal/modal.module';
import { SharedModule } from './../../../../shared/shared.module';
import { CalendarModule } from './../../../../components/calendar/calendar.module';
import { ListModule } from './../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { PersonFormComponent } from "./person.form.component";
import { PersonListComponent } from "./person.list.component";
import {routing} from "./person.routing";
import { TabModule } from '../../../../components/tab/tab.module';

@NgModule({
  imports:      [ routing, ListModule, CalendarModule, SharedModule, TabModule, ModalModule ],
  declarations: [ PersonListComponent, PersonFormComponent],
  bootstrap:    [ PersonListComponent ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonModule { }
