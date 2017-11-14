import { MessageService } from './../message/message.service';
import { SAPE_LOGIN } from './../../app.routing.mapping';
import { Router } from '@angular/router';

import {ApplicationError} from './application.error';
import { ErrorHandler, Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

  constructor(private router: Router, private messageService: MessageService) {}

   public handleError(error: Response | any): ApplicationError | Response | any {
    let errMsg: string;
    if (error instanceof Response) {
      let status = error.status;
      if (status) {
        if (status == 400 || status == 401) {
          this.router.navigate([SAPE_LOGIN.routingFull]);
        } 
      }
      
      if (error instanceof ApplicationError) {
        return new ApplicationError(error.code, error.message, error.helpMessage, error.status);
      }
      
      return error;
    }
   }
}
