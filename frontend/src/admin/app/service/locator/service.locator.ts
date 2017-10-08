import { Injector, InjectionToken, Type } from "@angular/core";


export class ServiceLocator {
    private static injector: Injector;

    public static setInjector(injector : Injector) : void {
         this.injector = injector;
    }

    public static get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T {
        return this.injector.get(token);
    }
}