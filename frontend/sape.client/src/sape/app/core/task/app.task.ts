import { AppActionTaskFactory } from './action/app.action.task.factory';
import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AppActionTask, AppActionType} from './action/app.action.task';
import {AppState} from '../state/app.state';

@Injectable()
export class AppTask {

  private source: BehaviorSubject<AppActionTask>;

  private actionTaskInit: AppActionTask = AppActionTaskFactory.create(AppActionType.INITIALIZING);

  constructor(private appState: AppState) {
    this.source = new BehaviorSubject<AppActionTask>(this.actionTaskInit);
    this.source.subscribe((appAction: AppActionTask) => this.appState.change(appAction));
    this.source.subscribe((appAction: AppActionTask) => {
      appAction.makeBefore();
      appAction.makeExecute().then((v: any) => appAction.makeAfter(v));
    });
  }

  run(appAction: AppActionTask) {
    this.source.next(appAction);
  }
}
