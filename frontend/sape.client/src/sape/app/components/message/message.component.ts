import { MessageService } from './../../service/message/message.service';
import { Message } from './../../service/message/message';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'message' ,
    templateUrl: './message.component.html',
  })
export class MessageComponent {

    private messages: Array<Message> = [];

    constructor(private messageService: MessageService) {
        this.messageService.registerOnChange(() => {
            this.refresh();
        })
    }

    public refresh() {
        this.messages = new Array<Message>();
        this.messages.concat(this.messageService.getMessages());
    }
}