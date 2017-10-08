/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {ModuleListComponent} from "./module.list.component";
import {ModuleFormComponent} from "./module.form.component";

const routes: Routes = [
  {
    path: '', component: ModuleListComponent
  },
  {
    path: ':id', component: ModuleFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
