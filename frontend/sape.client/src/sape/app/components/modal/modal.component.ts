import { CalendarComponent } from './../calendar/calendar.component';
import { DefaultModalOptions } from './default-modal.options';
import { ModalOptions } from './modal.options';
import { Component, OnInit, ViewChild, Input, QueryList, ContentChildren, OnDestroy } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ModalControl } from './modal.control';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'modal',
    styleUrls: ['./modal.component.css'],
    templateUrl: `./modal.component.html`,
  })
export class ModalComponent<T> implements OnInit, OnDestroy {
  
  @Input() options: ModalOptions;

  @Input() control: ModalControl<T>; 

  @Input() afterShow: Function = () => {
    if (this.calendarComponents && this.calendarComponents.length > 0) {
      this.calendarComponents.forEach(calendar => {
        calendar.init();
      });
    }
  };

  @ContentChildren(CalendarComponent, {descendants: true}) calendarComponents:QueryList<CalendarComponent>;

  private modal: any;

  ngOnInit(): void {
    if (!this.options) {
      this.options = new DefaultModalOptions();
    }
  }

  /**
   * Ativa o modal
   */
  public show(value: T) {
    this.getModal().modal('show');
    if (this.afterShow) {
      this.afterShow();
    }
    this.control.setModalValue(value);
  }

  /**
   * Ativa o modal
   */
  public hide() : any {
    this.getModal().modal('hide all');
    this.getModal().remove();
    return this.control.getModalValue();
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
        onApprove: () => { return this.control.getModalApprove(this.control.getModalValue());  },
        onDeny: () => { return this.control.getModalDeny(this.control.getModalValue());  },
      });
    }
    return this.modal;
  }

  ngOnDestroy() {
    this.afterShow = undefined;
    this.options = undefined;
    this.control = undefined;
    this.calendarComponents = undefined;
    this.modal = undefined; 
  }
}