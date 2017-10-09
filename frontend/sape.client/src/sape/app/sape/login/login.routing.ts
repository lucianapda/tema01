/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {LoginComponent} from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

export const routing = RouterModule.forChild(routes);
