import { ServiceLocator } from './service/locator/service.locator';
import { Injector } from '@angular/core';
import { AppLoaderService } from './app.loader.service';
import { routing } from './app.routing';
import { ServiceModule } from './service/service.module';
import { CoreModule } from './core/core.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    CoreModule.forRoot(),
    ServiceModule.forRoot(),
    routing
  ],
  providers: [AppLoaderService],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(injector: Injector) {
    ServiceLocator.setInjector(injector);
  }
 }

