/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import { HomeComponent } from "./home.component";
import {routing} from "./home.routing";

@NgModule({
imports:        [ routing ],
  declarations: [ HomeComponent ],
  bootstrap:    [ HomeComponent ]
})
export class HomeModule { }
