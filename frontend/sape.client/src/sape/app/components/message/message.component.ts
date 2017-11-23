import { ServiceLocator } from './../../service/locator/service.locator';
import { MessageService } from './../../service/message/message.service';
import { Component, ViewChild } from '@angular/core';
import { ToastContainerDirective } from 'ngx-toastr';

@Component({
    moduleId: module.id,
    selector: 'message' ,
    templateUrl: './message.component.html',
  })
export class MessageComponent {

    @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

    constructor() {}

    private messageService() : MessageService {
        return ServiceLocator.get(MessageService)
    }
    
    ngOnInit() {
        this.messageService().overlayContainer = this.toastContainer;
    }
}