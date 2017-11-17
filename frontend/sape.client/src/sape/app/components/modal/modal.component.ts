import { DefaultModalOptions } from './default-modal.options';
import { ModalOptions } from './modal.options';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'modal',
    styleUrls: ['./modal.component.css'],
    templateUrl: `./modal.component.html`,
  })
export class ModalComponent implements OnInit {
  
  @Input() options: ModalOptions;

  private modal: any;

  ngOnInit(): void {
    if (!this.options) {
      this.options = new DefaultModalOptions();
    }
  }

  /**
   * Ativa o modal
   */
  public show() {
    this.getModal().modal('show');
  }

  /**
   * Ativa o modal
   */
  public hide() {
    this.getModal().modal('hide')
  }

  private getModal() : any {
    if (!this.modal) {
      this.modal = $('.ui.modal').modal({
        detachable: this.options.detachable,
        autofocus: this.options.autofocus,
        observeChanges: this.options.observeChanges,
        allowMultiple: this.options.allowMultiple,
        keyboardShortcuts: this.options.keyboardShortcuts,
        offset: this.options.offset,
        context: this.options.context,
        closable: this.options.closable,
        blurring: this.options.blurring,
        inverted : this.options.inverted,
        dimmerSettings: 	
        {
          closable : false,
          useCSS   : true
        }, //You can specify custom settings to extend UI dimmer
        transition: this.options.transition,
        duration: this.options.duration,
        queue: this.options.queue,
        
        //Callbacks
        onShow: this.options.onShow,
        onVisible: this.options.onVisible,
        onHide: this.options.onHide,
        onHidden: this.options.onHidden,
        onApprove: this.options.onApprove,
        onDeny: this.options.onDeny,
      });
    }
    return this.modal;
  }
}