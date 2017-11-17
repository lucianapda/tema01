import { StringUtils } from './../../../../util/string/string.utils';
import { SAPE_PAGES_REGISTER_EVENTS, SAPE_PAGES_REGISTER_PEOPLE } from './../../../../app.routing.mapping';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceLocator } from './../../../../service/locator/service.locator';
import {Component} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormComponent} from '../../../../components/form/form.component';
import {PersonCrudService} from '../../../../service/crud/person/person.crud.service';
import {PersonDTO} from '../../../../model/person/person.dto';
import {BaseCrudService} from '../../../../service/crud/base.crud';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'person-form',
  styleUrls: ['./person.form.component.css'],
  templateUrl: './person.form.component.html'
})
export class PersonFormComponent extends FormComponent<PersonDTO> {

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);
  }
  
  protected personCrudService() { 
    return ServiceLocator.get(PersonCrudService);
  }

  protected getCrudService() : BaseCrudService<PersonDTO> {
    return this.personCrudService();
  }

  protected newSource() : PersonDTO{
    return new PersonDTO();
  }

  protected buildForm(formBuilder: FormBuilder, source: PersonDTO) : FormGroup{
    return formBuilder.group({
      id: new FormControl(source.id),
      version: new FormControl(source.version),
      code: new FormControl(source.code),
      name: new FormControl(source.name),
      birthDate: new FormControl(source.birthDate),
      cpf: new FormControl(source.cpf),
    }); 
  }

  protected bindForm(sourceForm: FormGroup, source: PersonDTO): void  {
    sourceForm.setValue({
      id: source.id,
      version: source.version,
      code: source.code,
      name: source.name, 
      birthDate: source.birthDate,
      cpf: source.cpf,
    });
  }

  protected onCancel() : void {
    this.goTo([SAPE_PAGES_REGISTER_PEOPLE.routingFull]);
  }
}