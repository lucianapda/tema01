import { SearchModule } from './../../../../components/search/search.module';
import { SharedModule } from './../../../../shared/shared.module';
import { CalendarModule } from './../../../../components/calendar/calendar.module';
import { ListModule } from './../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { SubscriptionFormComponent } from "./subscription.form.component";
import {routing} from "./subscription.routing";
import { TabModule } from '../../../../components/tab/tab.module';
import { SubscriptionListComponent } from './subscription.list.component';
import { AccordionModule } from '../../../../components/accordion/accordion.module';
import { ModalModule } from '../../../../components/modal/modal.module';

@NgModule({
  imports:      [ routing, ListModule, CalendarModule, SharedModule, TabModule, AccordionModule, SearchModule, ModalModule ],
  declarations: [ SubscriptionListComponent, SubscriptionFormComponent],
  bootstrap:    [ SubscriptionListComponent ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscriptionModule { }
