import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [BreadcrumbComponent],
  providers: [],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
