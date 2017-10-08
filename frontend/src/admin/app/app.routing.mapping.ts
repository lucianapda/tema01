
export class AppRouteMappging {

    constructor(private routingFull: string, private routingSimple: string) {}

    public getRoutingFull() : string {
        return this.routingFull;
    }

    public getRoutingSimple() : string {
        return this.routingSimple;
    }
}

export const SAPE = {routingFull: "sape", routingSimple:"sape"};
export const SAPE_LOGIN = {routingFull: "sape/login",  routingSimple:"login"};
export const SAPE_PAGES = {routingFull: "sape/pages",  routingSimple:"pages"};
export const SAPE_PAGES_ALL = {routingFull: "/sape/pages/all",  routingSimple:"all"};
export const SAPE_PAGES_HOME = {routingFull: "/sape/pages/home",  routingSimple:"home"};
export const SAPE_PAGES_REGISTER = {routingFull: "/sape/pages/register",  routingSimple:"register"};
export const SAPE_PAGES_REGISTER_MODULE = {routingFull: "/sape/pages/register/modules",  routingSimple:"modules"};
export const SAPE_PAGES_REGISTER_USER = {routingFull: "/sape/pages/register/users",  routingSimple:"users"};
export const SAPE_PAGES_REGISTER_COSTUMER = {routingFull: "/sape/pages/register/costumers",  routingSimple:"costumers"};
export const SAPE_PAGES_CONFIGURATION = {routingFull: "/sape/pages/configuration",  routingSimple:"configuration"};
export const SAPE_NOT_FOUND = {routingFull: "sape/notfound",  routingSimple:"notfound"};