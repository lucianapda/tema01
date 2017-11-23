import { ModalComponent } from './../../../../components/modal/modal.component';
import { PersonContactDTO } from './../../../../model/person/contact/person-contact.dto';
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
import { ModalControl } from '../../../../components/modal/modal.control';
import { ViewChild } from '@angular/core';

/**
 * Created by Guilherme 
 */
@Component({
  moduleId: module.id,
  selector: 'person-form',
  styleUrls: ['./person.form.component.css'],
  templateUrl: './person.form.component.html'
})
export class PersonFormComponent extends FormComponent<PersonDTO> implements ModalControl<PersonContactDTO> {

  @ViewChild(ModalComponent) componentModal: ModalComponent<PersonContactDTO>;

  private sourcePersonContactForm: FormGroup;
  private currentIndexEdit: number;

  constructor(route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    super(route, formBuilder, router);

    this.sourcePersonContactForm = formBuilder.group({
      id: new FormControl(null),
      version: new FormControl(null),
      idPerson: new FormControl(null),
      code: new FormControl(null, Validators.required), 
      description: new FormControl(null, Validators.required)
    });
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
      code: new FormControl(source.code, Validators.required),
      name: new FormControl(source.name, Validators.required),
      birthDate: new FormControl(source.birthDate, Validators.required),
      cpf: new FormControl(source.cpf, Validators.required),
      contacts: new FormControl(source.contacts)
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
      contacts: source.contacts,
    });
  }

  protected onCancel() : void {
    this.goTo([SAPE_PAGES_REGISTER_PEOPLE.routingFull]);
  }

  private editAction(contact: PersonContactDTO, index: number) : void {
    this.bindPersonContactForm(this.sourcePersonContactForm, contact);
    this.currentIndexEdit = index;
    this.componentModal.show(contact);
  }

  private removeAction(index: number) : void {
    this.source.getValue().contacts.splice(index, 1);
    this.bindForm(this.sourceForm, this.source.getValue());
  }

  protected bindPersonContactForm(sourcePersonContactForm: FormGroup, sourcePersonContact: PersonContactDTO): void  {
    sourcePersonContactForm.setValue({
      id: sourcePersonContact.id,
      version: sourcePersonContact.version,
      idPerson: sourcePersonContact.idPerson,
      code: sourcePersonContact.code,
      description: sourcePersonContact.description 
    });
  }

  /**
   * Retorna a ação que será executada quando o modal for aprovado.
   */
  getModalApprove(value: PersonContactDTO) : boolean {
    if (this.currentIndexEdit !== undefined) {
      this.source.getValue().contacts.splice(this.currentIndexEdit, 1);
      this.currentIndexEdit = undefined;
    }
    this.source.getValue().contacts.push(value);
    this.bindForm(this.sourceForm, this.source.getValue());
    return true;
  }
    
  /** 
   * Retorna a ação que será executada quando o modal for cancelado.
   */
  getModalDeny(value: PersonContactDTO) : boolean {
    return true; 
  }

  /**
   * Atirbui um valor ao controlador do modal.
   */
  setModalValue(value: PersonContactDTO) : void {}

  /**
   * Recupera o valor do controlador do modal.
   */
  getModalValue() : PersonContactDTO {
    return this.sourcePersonContactForm.getRawValue();
  }

  onPersonContactNew() {
    this.editAction(new PersonContactDTO(), undefined);
  }
}
