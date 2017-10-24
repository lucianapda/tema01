/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {EventTableComponent} from "./event.table.component";
import {EventFormComponent} from "./event.form.component";

const routes: Routes = [
  {
    path: '', component: EventTableComponent
  },
  {
    path: ':id', component: EventFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
