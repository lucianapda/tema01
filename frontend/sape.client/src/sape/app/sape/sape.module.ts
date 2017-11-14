import { MessageModule } from './../components/message/message.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SapeComponent} from './sape.component';
import {routing as routingSape} from './sape.routing';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports:      [ routingSape, SharedModule, MessageModule],
  providers:    [],
  exports:      [],
  declarations: [ SapeComponent ],
  bootstrap:    [ SapeComponent ],
  schemas:      [CUSTOM_ELEMENTS_SCHEMA]
})
export class SapeModule { }