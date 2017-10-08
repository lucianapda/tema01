
import { ApplicationError } from './application.error';
import { ErrorHandler, Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

   public handleError(error: Response | any): ApplicationError {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return new ApplicationError(error.code, error.message, 'Ajuda', error.status);
   }
}
