import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [ SharedModule ],
  declarations: [DropdownDirective],
  providers: [],
  exports: [DropdownDirective]
})
export class DropdownModule { }
