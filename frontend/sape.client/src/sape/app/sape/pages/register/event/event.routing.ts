/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {EventListComponent} from "./event.list.component";
import {EventFormComponent} from "./event.form.component";

const routes: Routes = [
  {
    path: '', component: EventListComponent
  },
  {
    path: 'edit/:id', component: EventFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
