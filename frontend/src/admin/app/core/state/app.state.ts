import {Injectable} from '@angular/core';
import {AppActionTask, AppActionType} from '../task/action/app.action.task';

@Injectable()
export class AppState {

  private state: AppActionType = null;

  change(action: AppActionTask) {
    this.state = action.getType();
  }

}
