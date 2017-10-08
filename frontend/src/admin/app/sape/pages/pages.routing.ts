import { SAPE_PAGES_HOME, SAPE_PAGES_REGISTER, SAPE_PAGES_CONFIGURATION, SAPE_PAGES_ALL } from './../../app.routing.mapping';
/**
 * Created by Guilherme on 03/04/2017.
 */
import { Routes, RouterModule }  from '@angular/router';
import {PagesComponent} from "./pages.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: SAPE_PAGES_ALL.routingSimple, loadChildren: 'app/sape/pages/all/all.module#AllModule' },
      { path: SAPE_PAGES_HOME.routingSimple, loadChildren: 'app/sape/pages/home/home.module#HomeModule' },
      { path: SAPE_PAGES_REGISTER.routingSimple, loadChildren: 'app/sape/pages/register/register.module#RegisterModule' },
      { path: SAPE_PAGES_CONFIGURATION.routingSimple, loadChildren: 'app/sape/pages/configuration/configuration.module#ConfigurationModule' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
