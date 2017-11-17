import { Component, OnInit } from '@angular/core';

declare var $: any;

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ 
  selector: '[tab]' 
})
export class TabDirective implements OnInit {
  
  private element: ElementRef;

  constructor(el: ElementRef) {
     this.element = el;
  }
  ngOnInit(): void {
    $('.ui.menu .item').tab();
  }
}