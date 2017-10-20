
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
export const SAPE_NOT_FOUND = {routingFull: "sape/notfound",  routingSimple:"notfound"};
export const SAPE_PAGES = {routingFull: "sape/pages",  routingSimple:"pages"};
export const SAPE_PAGES_ALL = {routingFull: "/sape/pages/all",  routingSimple:"all"};
export const SAPE_PAGES_HOME = {routingFull: "/sape/pages/home",  routingSimple:"home"};
// Start Registers
export const SAPE_PAGES_REGISTER = { routingFull: "/sape/pages/register", routingSimple: "register" };
export const SAPE_PAGES_REGISTER_EVENTS = { routingFull: "/sape/pages/register/events", routingSimple: "events" };
export const SAPE_PAGES_REGISTER_EVENTS_ACTIVITIES = { routingFull: "/sape/pages/register/events/activities", routingSimple: "events_activities" };
export const SAPE_PAGES_REGISTER_EVENTS_ENTRIES = { routingFull: "/sape/pages/register/events/entries", routingSimple: "events_entries" };
export const SAPE_PAGES_REGISTER_SUBSCRIPTIONS = { routingFull: "/sape/pages/register/subscriptions", routingSimple: "subscriptions" };
export const SAPE_PAGES_REGISTER_SUBSCRIPTIONS_ACTIVITIES = { routingFull: "/sape/pages/register/subscriptions/activities", routingSimple: "subscriptions_activites" };
export const SAPE_PAGES_REGISTER_PEOPLE = { routingFull: "/sape/pages/register/people", routingSimple: "people" };
// End Registers
export const SAPE_PAGES_CONFIGURATION = {routingFull: "/sape/pages/configuration",  routingSimple:"configuration"};