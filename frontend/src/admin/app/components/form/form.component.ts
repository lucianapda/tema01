import { LocalDataSource } from 'ng2-smart-table';
import { AppActionTask, AppActionType } from './../../core/task/action/app.action.task';
import {BaseComponent} from '../base/base.component';
import {BaseDTO} from '../../model/base/base.dto';
import {BaseCrudService} from '../../service/crud/base.crud';

export abstract class FormComponent<T extends BaseDTO > extends BaseComponent {

    private source: T;
    protected abstract getCrudService(): BaseCrudService<T>;

    protected getActionInit() : AppActionTask {
      return null;
    }
}
