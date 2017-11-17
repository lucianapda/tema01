import { Routes, RouterModule }  from '@angular/router';
import {SubscriptionListComponent} from "./subscription.list.component";
import {SubscriptionFormComponent} from "./subscription.form.component";

const routes: Routes = [
  {
    path: '', component: SubscriptionListComponent
  },
  {
    path: 'edit/:id', component: SubscriptionFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
