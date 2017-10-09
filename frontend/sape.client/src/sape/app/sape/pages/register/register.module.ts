/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import {routing} from "./register.routing";
import {RegisterComponent} from "./register.component";
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports:      [ SharedModule,
                  routing ],
  declarations: [ RegisterComponent ],
  bootstrap:    [ RegisterComponent ]
})
export class RegisterModule { }
