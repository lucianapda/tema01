import { MessageService } from './../../../../service/message/message.service';
import { SAPE_PAGES_REGISTER_PEOPLE_EDIT } from './../../../../app.routing.mapping';
import {ServiceLocator} from '../../../../service/locator/service.locator';
import {PersonCrudService} from '../../../../service/crud/person/person.crud.service';
import {ListColumn, ListAction, ListComponent} from '../../../../components/list/list.component';
import {StringUtils} from '../../../../util/string/string.utils';
import {PersonDTO} from '../../../../model/person/person.dto';
import {ListService} from '../../../../components/list/list.service';
import { Component, ViewChild } from '@angular/core';
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

  @ViewChild(ListComponent) private list: ListComponent<PersonDTO>;

  constructor(private router: Router) {}

  getTableService(): ListService<PersonDTO> {
    return this.personCrudService();
  }

  personCrudService() {
    return ServiceLocator.get(PersonCrudService);
  }

  public getColumns() : Array<ListColumn> { 
    return [new ListColumn('id',  'ID', -1, '', true),
            new ListColumn('code',  'Código', 0, 'sorted one wide', false),
            new ListColumn('name', 'Nome', 1, 'sorted four wide', false),
            new ListColumn('birthDate', 'Data de nascimento', 2, 'sorted four wide', false),
            new ListColumn('cpf', 'CPF', 3, 'sorted three wide', false, (value: any) =>{
              if(value){
                value = value.toString();
                if(value.length === 11){
                    return value.substring(0,3).concat(".")
                                         .concat(value.substring(3,6))
                                         .concat(".")
                                         .concat(value.substring(6,9))
                                         .concat("-")
                                         .concat(value.substring(9,11))
                } 
              }
              return value;
            })];
  }

  public getActions() : Array<ListAction> {
    return [new ListAction('edit', 'write', 0, (value: PersonDTO) => {
                if (value && value.id) {
                  this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_PEOPLE_EDIT.routingFull, new Map<string, any>([[':id', value.id]]))]);
                } 
            }), 
            new ListAction('delete', 'trash outline', 1, (value: PersonDTO) => {
              this.personCrudService().deleteById(value.id).then((result: any) => {
                if (result == value.id) {
                  this.list.refresh();
                  this.messageService().success("", "Registro excluído com sucesso!");
                }
              });
            })];  
  }

  private getNewAction() : ListAction {
    return new ListAction('new', 'add', -1, () => {
      this.router.navigate([StringUtils.replace(SAPE_PAGES_REGISTER_PEOPLE_EDIT.routingFull, new Map<string, any>([['/:id', '']]))]);
    });
  }

  protected messageService() : MessageService {
    return ServiceLocator.get(MessageService);
  }
}