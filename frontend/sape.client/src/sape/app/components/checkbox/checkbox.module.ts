import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { CheckboxDirective } from './checkbox.directive';

@NgModule({
  imports: [ SharedModule ],
  declarations: [CheckboxDirective],
  providers: [],
  exports: [CheckboxDirective]
})
export class CheckboxModule { }
