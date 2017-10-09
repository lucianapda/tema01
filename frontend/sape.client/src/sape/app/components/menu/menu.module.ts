import { MenuComponent } from './menu.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [MenuComponent],
  providers: [],
  exports: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
