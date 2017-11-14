import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'accordion',
    styleUrls: ['./accordion.component.css'],
    templateUrl: `./accordion.component.html`,
  })
export class AccordionComponent implements OnInit {
  
  ngOnInit(): void {
    $('.ui.accordion').accordion(); 
  }
}