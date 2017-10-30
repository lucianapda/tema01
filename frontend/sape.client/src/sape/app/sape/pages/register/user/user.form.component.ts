import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UserCrudService} from '../../../../service/crud/user/user.crud.service';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import {FormComponent} from '../../../../components/form/form.component';
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

  protected userCrudService() : UserCrudService{
    return ServiceLocator.get(UserCrudService);
  }

  protected getCrudService() : BaseCrudService<UserDTO> {
    return this.userCrudService();
  }

  protected newSource() : UserDTO{
    return new UserDTO();
  }

  protected buildForm(formBuilder: FormBuilder) : FormGroup{
    var f: FormGroup = formBuilder.group({
      place: formBuilder.control('oi', Validators.required),
      description: formBuilder.control('', Validators.required),
      dateStart: formBuilder.control('', Validators.required),
      dateEnd: formBuilder.control('', Validators.required),
      dateStartSubscription: formBuilder.control('', Validators.required),
      dateEndSubscription: formBuilder.control('', Validators.required),
      vacancy: formBuilder.control('', Validators.required),
      waitingList: formBuilder.control('', Validators.required),
    });
    this.bindForm(f, this.newSource());
    return f;
  }

  protected bindForm(sourceForm: FormGroup, source: UserDTO): void {
    sourceForm.setValue({
      // place: source.place,
      // description: source.description,
      // dateStart: source.dateStart,
      // dateEnd: source.dateEnd,
      // dateStartSubscription: source.dateStartSubscription,
      // dateEndSubscription: source.dateEndSubscription,
      // vacancy: source.vacancy,
      // waitingList: source.waitingList
    });
  }
}
