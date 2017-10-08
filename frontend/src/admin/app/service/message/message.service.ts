import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {Message} from './message';
import {HttpService} from '../http/http.service';

@Injectable()
export class MessageService {

  constructor(protected httpService: HttpService) {}

  public dispatchMessage(message: Message) {
    if (message instanceof Message) {
      console.log(message.getMessage());
    } else {
      console.log("Parameto não reconhecido em MessageService#dispatchMessage:" + message);
    }
  }

  public dispatchString(message: string | String) {
    this.dispatchMessage(new Message(message));
  }

  public dispatchAny(message: any) {
    this.dispatchMessage(new Message(message));
  }
}
