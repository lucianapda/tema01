import { NgxMaskModule } from './../components/mask/mask.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { SapeModule } from '../sape/sape.module';
import { BrowserModule } from '@angular/platform-browser'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {AppTask} from './task/app.task';
import {AppState} from './state/app.state';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
 
const CORE_PROVIDERS = [
  AppState,
  AppTask
]

@NgModule({
  imports: [
    SharedModule,
    SapeModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule,
    ToastrModule.forRoot({positionClass: 'inline'}),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot() 
  ],
  exports: [
    SharedModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule,
    ToastrModule,
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
