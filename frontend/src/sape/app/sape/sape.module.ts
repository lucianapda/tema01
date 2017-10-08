/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {SapeComponent} from './sape.component';
import {routing as routingSape} from './sape.routing';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports:      [ routingSape, SharedModule],
  providers:    [],
  exports:      [],
  declarations: [ SapeComponent ],
  bootstrap:    [ SapeComponent ],
  schemas:      [CUSTOM_ELEMENTS_SCHEMA]
})
export class SapeModule { }
