/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {NotFoundComponent} from './not.found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

export const routing = RouterModule.forChild(routes);
