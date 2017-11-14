/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {EventActivityListComponent} from "./event-activity.list.component";
import {EventActivityFormComponent} from "./event-activity.form.component";

const routes: Routes = [
  {
    path: '', component: EventActivityListComponent
  },
  {
    path: 'edit/:id', component: EventActivityFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
