/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {PersonListComponent} from "./person.list.component";
import {PersonFormComponent} from "./person.form.component";

const routes: Routes = [
  {
    path: '', component: PersonListComponent
  },
  {
    path: 'edit/:id', component: PersonFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
