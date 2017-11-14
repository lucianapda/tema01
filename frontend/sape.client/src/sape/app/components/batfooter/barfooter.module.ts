import { DropdownModule } from './../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { BarfooterComponent } from './barfooter.component';
import { BarfooterService } from './barfooter.service';
import { MenuSelectModule } from '../menu/select/menu-select.module';

@NgModule({
  imports: [ MenuSelectModule, SharedModule, DropdownModule ],
  declarations: [BarfooterComponent],
  providers: [BarfooterService],
  exports: [BarfooterComponent]
})
export class BarfooterModule { }
