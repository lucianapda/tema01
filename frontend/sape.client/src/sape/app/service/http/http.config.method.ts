import { HttpHeaders } from './http.headers';

export class HttpConfigMethod {
    
    constructor(public data?: any, public params?: Map<string, any>, public headers?: HttpHeaders){

    }
}