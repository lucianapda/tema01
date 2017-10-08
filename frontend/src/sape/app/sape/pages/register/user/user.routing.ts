/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {UserListComponent} from "./user.list.component";
import {UserFormComponent} from "./user.form.component";

const routes: Routes = [
  {
    path: '', component: UserListComponent
  },
  {
    path: ':id', component: UserFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
