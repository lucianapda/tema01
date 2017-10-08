/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import { AllComponent } from "./all.component";
import {routing} from "./all.routing";

@NgModule({
imports:        [ routing ],
  declarations: [ AllComponent ],
  bootstrap:    [ AllComponent ]
})
export class AllModule { }
