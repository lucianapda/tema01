import { SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_ENTRIES, SAPE_PAGES_REGISTER_SUBSCRIPTIONS, SAPE_PAGES_REGISTER_PEOPLE } from './../../../app.routing.mapping';
/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {RegisterComponent} from "./register.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: RegisterComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: SAPE_PAGES_REGISTER_EVENTS.routingSimple, loadChildren: 'app/sape/pages/register/event/event.module#EventModule' },
      { path: SAPE_PAGES_REGISTER_ENTRIES.routingSimple, loadChildren: 'app/sape/pages/register/entry/entry.module#EntryModule' },
      { path: SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingSimple, loadChildren: 'app/sape/pages/register/subscription/subscription.module#SubscriptionModule' },
      { path: SAPE_PAGES_REGISTER_PEOPLE.routingSimple, loadChildren: 'app/sape/pages/register/person/person.module#PersonModule' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
