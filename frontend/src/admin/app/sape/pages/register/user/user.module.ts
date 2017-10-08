/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import { UserFormComponent } from "./user.form.component";
import { UserListComponent } from "./user.list.component";
import {routing} from "./user.routing";

@NgModule({
imports:        [ routing ],
  declarations: [ UserListComponent, UserFormComponent],
  bootstrap:    [ UserListComponent ]
})
export class UserModule { }
