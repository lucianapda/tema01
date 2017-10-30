import { OnInit, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ServiceLocator } from './../../service/locator/service.locator';
import {AppTask} from '../../core/task/app.task';
import {AppActionType, AppActionTask} from '../../core/task/action/app.action.task';
import {AppActionTaskFactory} from '../../core/task/action/app.action.task.factory';

export abstract class BaseComponent implements OnInit, AfterViewChecked, OnChanges {

  private appTask: AppTask = ServiceLocator.get(AppTask);

  protected createAction(type: AppActionType) : AppActionTask {
    return AppActionTaskFactory.create(type);
  } 

  protected abstract getActionInit() : AppActionTask;
  
  ngOnInit(): void {
     this.appTask.run(this.getActionInit());
  }

  ngAfterViewChecked() {
  }

  ngOnChanges(): void {
  }
}
