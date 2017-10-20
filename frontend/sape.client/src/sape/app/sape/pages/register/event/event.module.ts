import { ListModule } from './../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { EventFormComponent } from "./event.form.component";
import { EventListComponent } from "./event.list.component";
import {routing} from "./event.routing";

@NgModule({
  imports:      [ routing, ListModule ],
  declarations: [ EventListComponent, EventFormComponent],
  bootstrap:    [ EventListComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventEvent { }
