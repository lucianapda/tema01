import { OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ServiceLocator } from './../../service/locator/service.locator';
import {AppTask} from '../../core/task/app.task';
import {AppActionType, AppActionTask} from '../../core/task/action/app.action.task';
import {AppActionTaskFactory} from '../../core/task/action/app.action.task.factory';

export abstract class BaseComponent implements OnInit, AfterViewChecked {

  private appTask: AppTask = ServiceLocator.get(AppTask);

  protected createAction(type: AppActionType) : AppActionTask {
    return AppActionTaskFactory.create(type);
  } 

   ngOnInit(): void {
      this.appTask.run(this.getActionInit());
   }

   ngAfterViewChecked() {
  }
   protected abstract getActionInit() : AppActionTask;
}
