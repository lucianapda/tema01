import { AccordionModule } from './../../accordion/accordion.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { MenuSideBarComponent } from './menu-sidebar.component';

@NgModule({
  declarations: [MenuSideBarComponent],
  providers: [],
  exports: [MenuSideBarComponent],
  imports: [SharedModule, AccordionModule],
  bootstrap: []
})
export class MenuSideBarModule { }