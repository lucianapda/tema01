import { ServiceLocator } from './../service/locator/service.locator';
import {ElementRef, Renderer, ViewChild, Component, OnInit} from '@angular/core'
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

    constructor(private router: Router, private renderer: Renderer, private menuService: MenuService) {
        router.events.subscribe((event: RouterEvent) => this._navigationInterceptor(event));
    }

    // Shows and hides the loading spinner during RouterEvent changes
    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            console.log('start: '+event.url);
        }
        if (event instanceof NavigationEnd) {
            this.menuService.setMenuUrl(event.url, false);
            console.log('end: ' + event.url)
        }
        if (event instanceof NavigationCancel) {
            console.log('cancel: '+event.url);
        }
        if (event instanceof NavigationError) {
            console.log('error: '+event.url);
        }
    }
}
