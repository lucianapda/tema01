import { SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES, SAPE_PAGES_REGISTER_EVENTS_ENTRIES, SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES,  SAPE_PAGES_REGISTER_SUBSCRIPTIONS } from './../../../app.routing.mapping';
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
      { path: SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES.routingSimple, loadChildren: 'app/sape/pages/register/event/activity/eventActivity.module#EventActivityModule' },
      { path: SAPE_PAGES_REGISTER_EVENTS_ENTRIES.routingSimple, loadChildren: 'app/sape/pages/register/event/entry/eventEntry.module#EventEntryModule' },
      { path: SAPE_PAGES_REGISTER_SUBSCRIPTIONS.routingSimple, loadChildren: 'app/sape/pages/register/subscription/subscription.module#SubscriptionModule' },
      { path: SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES.routingSimple, loadChildren: 'app/sape/pages/register/subscription/activity/subscriptionActivity.module#SubscriptionActivityModule' },
      { path: SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES.routingSimple, loadChildren: 'app/sape/pages/register/person/person.module#PersonModule' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
