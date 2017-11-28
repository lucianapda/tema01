import { SearchModule } from './../../../../components/search/search.module';
import { SharedModule } from './../../../../shared/shared.module';
import { CalendarModule } from './../../../../components/calendar/calendar.module';
import { ListModule } from './../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { EntryFormComponent } from "./entry.form.component";
import {routing} from "./entry.routing";
import { TabModule } from '../../../../components/tab/tab.module';
import { EntryListComponent } from './entry.list.component';
import { AccordionModule } from '../../../../components/accordion/accordion.module';
import { ModalModule } from '../../../../components/modal/modal.module';

@NgModule({
  imports:      [ routing, ListModule, CalendarModule, SharedModule, TabModule, AccordionModule, SearchModule, ModalModule ],
  declarations: [ EntryListComponent, EntryFormComponent],
  bootstrap:    [ EntryListComponent ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntryModule { }
