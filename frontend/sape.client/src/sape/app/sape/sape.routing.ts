import { SAPE, SAPE_PAGES, SAPE_LOGIN, SAPE_NOT_FOUND } from './../app.routing.mapping';

/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {SapeComponent} from './sape.component';
import {AuthGuard} from '../service/auth/auth.guard';

const routes: Routes = [
  {
    path: SAPE.routingSimple,
    component: SapeComponent,
    children: [
      {
        path: SAPE_LOGIN.routingSimple, loadChildren: 'app/sape/login/login.module#LoginModule'
      },
      {
        path: SAPE_PAGES.routingSimple, loadChildren: 'app/sape/pages/pages.module#PagesModule', canActivate: [ AuthGuard ], 
      },
      {
        path: SAPE_NOT_FOUND.routingSimple, loadChildren: 'app/sape/not.found/not.found.module#NotFoundModule'
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
