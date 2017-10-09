import { AppRouteMappging, SAPE_PAGES_REGISTER_MODULE, SAPE_PAGES_REGISTER_USER } from './../../../app.routing.mapping';
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
      { path: SAPE_PAGES_REGISTER_MODULE.routingSimple, loadChildren: 'app/sape/pages/register/module/module.module#ModuleModule' },
      { path: SAPE_PAGES_REGISTER_USER.routingSimple, loadChildren: 'app/sape/pages/register/user/user.module#UserModule' }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
