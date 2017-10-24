import { ServiceLocator } from './../service/locator/service.locator';
import {ElementRef, Renderer, ViewChild, Component, OnInit, NgZone } from '@angular/core'
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent} from '@angular/router'
import {MenuService} from '../service/menu/menu.service';

/**
 * Created by Guilherme on 03/04/2017.
 */

@Component({
    moduleId: module.id,
    selector: 'sape',
    styleUrls: ['./sape.component.css'],
    templateUrl: './sape.component.html'
})
export class SapeComponent {

    showLoader: boolean = true;

    constructor(private router: Router, private ngZone: NgZone, private renderer: Renderer, private menuService: MenuService) {
        router.events.subscribe((event: RouterEvent) => this._navigationInterceptor(event));
    }

    // Shows and hides the loading spinner during RouterEvent changes
    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            console.log('start: '+event.url);
            if (!this.showLoader) { 
                this.ngZone.runOutsideAngular(() => this.showLoader = true);    
            }
        }
        if (event instanceof NavigationEnd) {
            this.menuService.setMenuUrl(event.urlAfterRedirects, false);
            this._hideSpinner();
            console.log('end: ' +  event.urlAfterRedirects)
        }
        if (event instanceof NavigationCancel) {
            console.log('cancel: '+event.url + ' reason: ' + event.reason);
            this._hideSpinner();
        }
        if (event instanceof NavigationError) {
            console.log('error: '+event.url + ' error: ' + event.error);
            this._hideSpinner();
        }
    }

    private _hideSpinner(): void {
        this.ngZone.runOutsideAngular(() => this.showLoader = false);
    }
}
