import {ServiceLocator} from '../../../../service/locator/service.locator';
import {PersonCrudService} from '../../../../service/crud/person/person.crud.service';
import {ListColumn, ListAction} from '../../../../components/list/list.component';
import {StringUtils} from '../../../../util/string/string.utils';
import {SAPE_PAGES_REGISTER_PEOPLE_EDIT} from '../../../../app.routing.mapping';
import {PersonDTO} from '../../../../model/person/person.dto';
import {ListService} from '../../../../components/list/list.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Created by Guilherme on 03/04/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'person-list',
  styleUrls: ['./person.list.component.css'],
  templateUrl: './person.list.component.html',
})
export class PersonListComponent {

  constructor(private router: Router) {}

  getTableService(): ListService<PersonDTO> {
    return this.personCrudService();
  }

  personCrudService() {
    return ServiceLocator.get(PersonCrudService);
  }

  public getColumns() : Array<ListColumn> { 
    return [new ListColumn('code',  'Código', 0, 'sorted one wide'),
            new ListColumn('name', 'Nome', 1, 'sorted four wide'),
            new ListColumn('birthDate', 'Data de nascimento', 2, 'sorted four wide'),
            new ListColumn('cpf', 'CPF', 3, 'sorted three wide')];
  }

  public getActions() : Array<ListAction> {
    return [new ListAction('edit', 'write', 0, (value: PersonDTO) => {
                if (value && value.id) {
                  this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_PEOPLE_EDIT.routingFull, new Map<string, any>([[':id', value.id]]))]);
                } 
            }), 
            new ListAction('delete', 'trash outline', 1, (value: PersonDTO) => {
              this.personCrudService().deleteById(value.id);
            })]; 
  }
}