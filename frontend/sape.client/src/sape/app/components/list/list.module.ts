import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [ListComponent],
  providers: [],
  exports: [ListComponent],
  imports: [SharedModule, SuiModule],
  bootstrap: []
})
export class ListModule { }
