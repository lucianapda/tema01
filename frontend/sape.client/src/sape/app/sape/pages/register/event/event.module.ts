
import { TableModule } from './../../../../components/table/table.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { EventFormComponent } from "./event.form.component";
import { EventTableComponent } from "./event.table.component";
import {routing} from "./event.routing";

@NgModule({
  imports:      [ routing, TableModule ],
  declarations: [ EventTableComponent, EventFormComponent],
  bootstrap:    [ EventTableComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModule { }
