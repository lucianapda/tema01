import {AppActionType, AppActionTask, AppAction} from './app.action.task';
import {Injectable} from '@angular/core';

export class AppActionTaskFactory {

  static create(type: AppActionType) : AppActionTask {
    return new AppActionTask(type);
  }
}
