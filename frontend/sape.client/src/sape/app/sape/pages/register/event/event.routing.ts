import { SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES } from './../../../../app.routing.mapping';
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
    path: 'edit/:id', component: EventFormComponent, children: [
      {
        path: SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES.routingSimple, loadChildren: 'app/sape/pages/register/event/activity/event-activity.module#EventActivityModule',
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
