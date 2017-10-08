/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import { ConfigurationComponent } from "./configuration.component";
import {routing} from "./configuration.routing";

@NgModule({
imports:        [ routing ],
  declarations: [ ConfigurationComponent ],
  bootstrap:    [ ConfigurationComponent ]
})
export class ConfigurationModule { }
