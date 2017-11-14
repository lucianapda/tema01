
export class AppRouteMappging {

    constructor(private routingFull: string, private routingFullRegExp: RegExp, private routingSimple: string, ) {}

    public getRoutingFull() : string {
        return this.routingFull;
    }

    public getRoutingFullRegExp() : RegExp {
        return this.routingFullRegExp;
    }

    public getRoutingSimple() : string {
        return this.routingSimple;
    }
}

export const SAPE = {routingFull: "/sape", routingFullRegExp: /^\/sape$/ , routingSimple:"sape"};
export const SAPE_LOGIN = {routingFull: "/sape/login", routingFullRegExp: /^\/sape\/login$/ , routingSimple:"login"};
export const SAPE_NOT_FOUND = {routingFull: "/sape/notfound",  routingFullRegExp: /^\/sape\/notfound$/, routingSimple:"notfound"};
export const SAPE_PAGES = {routingFull: "/sape/pages",  routingFullRegExp: /^\/sape\/pages$/, routingSimple:"pages"};
// export const SAPE_PAGES_ALL = {routingFull: "/sape/pages/all",  routingSimple:"all"};
export const SAPE_PAGES_HOME = {routingFull: "/sape/pages/home",  routingFullRegExp: /^\/sape\/pages\/home$/, routingSimple:"home"};
// Start Registers
export const SAPE_PAGES_REGISTER = { routingFull: "/sape/pages/register",  routingFullRegExp: /^\/sape\/pages\/register$/, routingSimple: "register" };

// Events
export const SAPE_PAGES_REGISTER_EVENTS = { routingFull: "/sape/pages/register/events", routingFullRegExp: /^\/sape\/pages\/register\/events$/, routingSimple: "events" };
export const SAPE_PAGES_REGISTER_EVENTS_EDIT = { routingFull: "/sape/pages/register/events/edit/:id", routingFullRegExp: /^\/sape\/pages\/register\/events\/edit\/([0-9])+$/ , routingSimple: "events/edit" };
export const SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES = { routingFull: "/sape/pages/register/events/edit/:idEvent/activities", routingFullRegExp: /^\/sape\/pages\/register\/events\/edit\/([0-9]+)\/activities$/,  routingSimple: "activities" };
export const SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES_EDIT = { routingFull: "/sape/pages/register/events/edit/:idEvent/activities/edit/:idActivity", routingFullRegExp: /^\/sape\/pages\/register\/events\/edit\/([0-9]+)\/activities\/edit(\/([0-9]+))?$/,  routingSimple: "activities/edit" };

export const SAPE_PAGES_REGISTER_EVENTS_ENTRIES = { routingFull: "/sape/pages/register/events/entries", routingFullRegExp: /^\/sape\/pages\/register\/entries(\/([0-9]+))?$/, routingSimple: "entries" };
export const SAPE_PAGES_REGISTER_SUBSCRIPTIONS = { routingFull: "/sape/pages/register/subscriptions", routingFullRegExp: /^\/sape\/pages\/register\/subscriptions(\/([0-9]+))?$/, routingSimple: "subscriptions" };
export const SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES = { routingFull: "/sape/pages/register/subscriptions/:id/activities", routingFullRegExp: /^\/sape\/pages\/register\/subscriptions\/([0-9]+)\/activities(\/([0-9]+))?$/, routingSimple: "subscriptions_activites" };
export const SAPE_PAGES_REGISTER_PEOPLE = { routingFull: "/sape/pages/register/people", routingFullRegExp: /^\/sape\/pages\/register\/people(\/([0-9]+))?$/, routingSimple: "people" };
// End Registers
export const SAPE_PAGES_CONFIGURATION = {routingFull: "/sape/pages/configuration", routingFullRegExp: /^\/sape\/pages\/configuration$/, routingSimple:"configuration"};