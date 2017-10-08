import { ListModule } from './../../../../components/list/list.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import { ModuleFormComponent } from "./module.form.component";
import { ModuleListComponent } from "./module.list.component";
import {routing} from "./module.routing";

@NgModule({
  imports:      [ routing, ListModule ],
  declarations: [ ModuleListComponent, ModuleFormComponent],
  bootstrap:    [ ModuleListComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleModule { }
