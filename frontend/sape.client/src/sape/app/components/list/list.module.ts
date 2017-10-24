import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  providers: [],
  exports: [ListComponent],
  imports: [SharedModule],
  bootstrap: []
})
export class ListModule { }
