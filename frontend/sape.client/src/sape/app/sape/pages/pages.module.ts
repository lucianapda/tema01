import { MessageModule } from './../../components/message/message.module';
import { BreadcrumbModule } from './../../components/breadcrumb/breadcrumb.module';
import { MenuSideBarModule } from './../../components/menu/sidebar/menu-sidebar.module';
import { NgModule }      from '@angular/core';
import {routing} from "./pages.routing";
import {PagesComponent} from "./pages.component";
import {HomeModule} from "./home/home.module";
import {BartopModule} from '../../components/bartop';
import {SharedModule} from '../../shared/shared.module';
import { BarfooterModule } from '../../components/batfooter/barfooter.module';
 
@NgModule({
  imports:      [ SharedModule,
                  routing,
                  BartopModule,
                  MenuSideBarModule,
                  BreadcrumbModule,
                  BarfooterModule,
                  MessageModule ],
  declarations: [ PagesComponent ],
  bootstrap:    [ PagesComponent ]
})
export class PagesModule { }
