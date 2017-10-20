import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { EventCrudService } from './crud/event/event.crud.service';
import { UserCrudService } from './crud/user/user.crud.service';
import { StorageService } from './storage/storage.service';
import { HttpService } from './http/http.service';
import { TokenService } from './token/token.service';
import { MessageService } from './message/message.service';
import { MenuService } from './menu/menu.service';
import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApplicationErrorHandler } from './error/application.error.handler';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';

/**
 * Created by Guilherme on 06/04/2017.
 */
const PROVIDERS = [
  ApplicationErrorHandler,
  //{ provide: ErrorHandler, useClass: ApplicationErrorHandler },
  AuthGuard,
  AuthService,
  TokenService,
  HttpService,
  EventCrudService,
  UserCrudService,
  MessageService,
  StorageService,
  MenuService
];

@NgModule({
  imports: [CommonModule],
  providers: [PROVIDERS]
})
export class ServiceModule {

  constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error("ServiceModule já foi carregado, importação deve ser feita apenas no ServiceModule");
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [PROVIDERS]
    };
  }
}
