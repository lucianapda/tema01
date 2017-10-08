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
    
    showLoader: boolean = true;

    constructor(private router: Router, private ngZone: NgZone, private renderer: Renderer, private loaderService: AppLoaderService) {
        router.events.subscribe((event: RouterEvent) => this._navigationInterceptor(event));
    }

    // Shows and hides the loading spinner during RouterEvent changes
    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.ngZone.runOutsideAngular(() => this.showLoader = true);
        }
        if (event instanceof NavigationEnd) {
            this._hideSpinner();
        }
        if (event instanceof NavigationCancel) {
            this._hideSpinner();
        }
        if (event instanceof NavigationError) {
            this._hideSpinner();
        }
    }

    private _hideSpinner(): void {
        this.ngZone.runOutsideAngular(() => this.showLoader = false);
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}
