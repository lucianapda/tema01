import { DropdownModule } from './../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { BartopComponent } from './bartop.component';
import { BartopService } from './bartop.service';
import { MenuSelectModule } from '../menu/select/menu-select.module';

@NgModule({
  imports: [ MenuSelectModule, SharedModule, DropdownModule ],
  declarations: [BartopComponent],
  providers: [BartopService],
  exports: [BartopComponent]
})
export class BartopModule { }
