import { Component, EventEmitter, Input, Output, OnInit, AfterViewChecked } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'list' ,
  templateUrl: './list.component.html',
})
export class FormToolbarComponent {

  // Events of save
  @Input() beforeSave: Function;
  @Input() onSave: Function;
  @Input() afterSave: Function;
  // Events of edit
  @Input() onEdit = new EventEmitter<any>();
  @Input() beforeEdit = new EventEmitter<any>();
  @Input() afterEdit = new EventEmitter<any>();
  // Events of delete
  @Input() onDelete = new EventEmitter<any>();
  @Input() beforeDelete = new EventEmitter<any>();
  @Input() afterDelete = new EventEmitter<any>();
}