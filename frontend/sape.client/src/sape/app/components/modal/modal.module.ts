import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module'
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ModalComponent],
  providers: [],
  exports: [ModalComponent]
})
export class ModalModule { }
