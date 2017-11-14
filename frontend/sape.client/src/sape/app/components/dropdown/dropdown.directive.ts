import { Component, OnInit } from '@angular/core';

declare var $: any;

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ 
  selector: '[dropdown]' 
})
export class DropdownDirective implements OnInit {
  
  private element: ElementRef;

  constructor(el: ElementRef) {
     this.element = el;
  }
  ngOnInit(): void {
    $(this.element.nativeElement).dropdown();
  }
}