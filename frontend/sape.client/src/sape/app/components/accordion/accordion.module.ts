import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [AccordionComponent],
  providers: [],
  exports: [AccordionComponent]
})
export class AccordionModule { }
