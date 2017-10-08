import { NgModule } from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { ListComponent } from './list.component';

@NgModule({
  imports: [Ng2SmartTableModule],
  declarations: [],
  providers: [],
  exports: [Ng2SmartTableModule],
  bootstrap: []
})
export class ListModule { }
