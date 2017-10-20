import { SuiModule } from 'ng2-semantic-ui';
/**
 * Core module
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from '@angular/core';

import { SapeModule } from '../sape/sape.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NglModule } from 'ng-lightning';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {AppTask} from './task/app.task';
import {AppState} from './state/app.state';

const CORE_PROVIDERS = [
  AppState,
  AppTask
]

@NgModule({
  imports: [
    SharedModule,
    SapeModule,
    NglModule.forRoot(),
    SuiModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule,
  ],
  exports: [
    SharedModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule
  ],
  providers: CORE_PROVIDERS
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule já foi carregado, importação deve ser feita apenas no AppModule");
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: CORE_PROVIDERS
    };
  }
}