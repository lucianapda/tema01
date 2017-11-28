import { MessageService } from './../message/message.service';
import { SAPE_LOGIN } from './../../app.routing.mapping';
import { Router } from '@angular/router';

import {ApplicationError} from './application.error';
import { ErrorHandler, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

  constructor(private router: Router, private messageService: MessageService) {}

   public handleError(error: Response | any): ApplicationError | ApplicationError[] | Response | any {
    let errMsg: string;
    if (error instanceof Response) {
      let exception = error.json();
      let status = error.status;
      if (status) {
        if (status == 401 || status == 0) {
          this.router.navigate([SAPE_LOGIN.routingFull]);
        }
      }
      if (exception.errors) {
        let errors: Array<ApplicationError> = new Array<ApplicationError>();
        exception.errors.forEach((e: ApplicationError | Object | any) => {
          errors.push(new ApplicationError(e.code, e.message, e.helpMessage, exception.staus))
        });
        return errors;
      }
    }
    return error;
   }
}
