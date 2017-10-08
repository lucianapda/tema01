/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {ConfigurationComponent} from "./configuration.component";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: ConfigurationComponent
  }
];

export const routing = RouterModule.forChild(routes);
