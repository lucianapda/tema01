import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { TabDirective } from './tab.directive';

@NgModule({
  imports: [ SharedModule ],
  declarations: [TabDirective],
  providers: [],
  exports: [TabDirective]
})
export class TabModule { }
