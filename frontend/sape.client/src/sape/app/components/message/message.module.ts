import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  declarations: [MessageComponent],
  providers: [],
  exports: [MessageComponent],
  imports: [
    SharedModule,
    ToastContainerModule
  ],
  bootstrap: []
})
export class MessageModule { }
