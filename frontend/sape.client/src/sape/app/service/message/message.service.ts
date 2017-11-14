import { Injectable, EventEmitter, OnChanges } from '@angular/core';
import {BaseService} from '../base.service';
import {Message, MESSAGE_ERROR, MESSAGE_SUCCESS, MESSAGE_WARNING, MESSAGE_INFO} from './message';
import {HttpService} from '../http/http.service';

@Injectable()
export class MessageService {

  private messages: Array<Message> = new Array<Message>();
  private onChange: Function = () => {};

  // Cores utilizadas.
  private messageColors = [
      {'info' : 'info'},
      {'success' : 'success'},
      {'error' : 'negative'},
      {'warning' : 'warning'}
  ];

  /**
   * Dispara uma menssagem.
   * @param message - {@link Message}
   */
  public message(message: Message) {
      this.messages.push(message);
      this.onChange();
  }

  /**
   * Dispara uma menssagem de erro.
   * @param message - {@link string}
   * @param messageDetail - {@link string}
   */
  public error(message: string, messageDetail: string) {
      this.message(new Message(null, message, messageDetail, MESSAGE_ERROR))
  }

  /**
   * Dispara uma menssagem de sucesso.
   * @param message - {@link Message}
   */
  public success(message: string, messageDetail: string) {
    this.message(new Message(null, message, messageDetail, MESSAGE_SUCCESS))
  }

  /**
   * Dispara uma menssagem de alerta.
   * @param message - {@link Message}
   */
  public warning(message: string, messageDetail: string) {
    this.message(new Message(null, message, messageDetail, MESSAGE_WARNING));
  }

  /**
   * Dispara uma menssagem de info.
   * @param message - {@link Message}
   */
  public info(message: string, messageDetail: string) {
    this.message(new Message(null, message, messageDetail, MESSAGE_INFO));
  }
  
  public getMessages() : Array<Message> {
      return this.messages;
  }
  
  public setMessages(messages: Array<Message>) {
      this.messages = messages;
  }

  public registerOnChange(fn: Function){
      this.onChange = fn;
  }
}