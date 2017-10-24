import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent} from '@angular/router'
import { AppLoaderService } from './app.loader.service';
import { ServiceModule } from './service/service.module';
import { Injector, Renderer, NgZone } from '@angular/core';
import {Component} from '@angular/core'
import { ServiceLocator } from "./service/locator/service.locator";

@Component({
    moduleId: module.id,
    selector: 'app-sape',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    
    constructor(private router: Router, private ngZone: NgZone, private renderer: Renderer, private loaderService: AppLoaderService) {
    }
}
