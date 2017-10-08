import {Component} from "@angular/core";
import {FormComponent} from '../../../../components/form/form.component';
import {UserCrudService} from '../../../../service/crud/user/user.crud.service';
import {UserDTO} from '../../../../model/user/user.dto';
import {BaseCrudService} from '../../../../service/crud/base.crud';

/**
 * Created by Guilherme on 03/04/2017.
 */

@Component({
  moduleId: module.id,
  selector: 'user-form',
  styleUrls: ["./user.form.component.css"],
  templateUrl: `./user.form.component.html`,
})
export class UserFormComponent extends FormComponent<UserDTO> {

  constructor(private userCrudService: UserCrudService) {
    super();
  }

  protected getCrudService() : BaseCrudService<UserDTO> {
    return this.userCrudService;
  }
}
