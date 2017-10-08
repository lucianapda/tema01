/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {AllComponent} from "./all.component";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AllComponent
  }
];

export const routing = RouterModule.forChild(routes);
