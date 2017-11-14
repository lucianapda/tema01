import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [MessageComponent],
  providers: [],
  exports: [MessageComponent],
  imports: [SharedModule],
  bootstrap: []
})
export class MessageModule { }
