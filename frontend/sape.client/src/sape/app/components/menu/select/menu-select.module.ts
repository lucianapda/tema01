import { MenuSelectComponent } from './menu-select.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [SharedModule, SuiModule],
  declarations: [MenuSelectComponent],
  providers: [],
  exports: [MenuSelectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuSelectModule { }
