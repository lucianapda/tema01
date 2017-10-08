
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from '../message/message.service';

@Injectable()
export class StorageService {

  constructor(private messageService: MessageService) {}

  put(key: string, data: Object | any) {
    let jsonData: string;
    try {
      jsonData = JSON.stringify(data);
    } catch(e) {
      this.messageService.dispatchMessage(e);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string) : Object {
    let data = localStorage.getItem(key);
    if (!!data) {
      return JSON.parse(data);
    }
    return null;
  }
}
