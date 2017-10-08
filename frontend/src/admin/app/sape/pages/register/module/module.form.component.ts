import {Component} from "@angular/core";
import {FormComponent} from '../../../../components/form/form.component';
import {ModuleCrudService} from '../../../../service/crud/module/module.crud.service';
import {ModuleDTO} from '../../../../model/module/module.dto';
import {BaseCrudService} from '../../../../service/crud/base.crud';
/**
 * Created by Guilherme on 03/04/2017.
 */

@Component({
  moduleId: module.id,
  selector: 'module-form',
  styleUrls: ['./module.form.component.css'],
  templateUrl: './module.form.component.html'
})
export class ModuleFormComponent extends FormComponent<ModuleDTO> {

  constructor(private moduleCrudService: ModuleCrudService) {
    super();
  }

  protected getCrudService() : BaseCrudService<ModuleDTO> {
    return this.moduleCrudService;
  }
}
