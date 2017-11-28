import { Routes, RouterModule }  from '@angular/router';
import {EntryListComponent} from "./entry.list.component";
import {EntryFormComponent} from "./entry.form.component";

const routes: Routes = [
  {
    path: '', component: EntryListComponent
  },
  {
    path: 'edit/:id', component: EntryFormComponent
  }
];

export const routing = RouterModule.forChild(routes);
