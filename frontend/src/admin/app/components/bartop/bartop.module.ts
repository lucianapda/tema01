import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { BartopComponent } from './bartop.component';
import { BartopService } from './bartop.service';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  imports: [ MenuModule, SharedModule ],
  declarations: [BartopComponent],
  providers: [BartopService],
  exports: [BartopComponent]
})
export class BartopModule { }
