import { ListColumn, ListAction } from './../../../components/list/list.component';

import {BaseCrudService} from "../base.crud";
import {UserDTO} from "../../../model/user/user.dto";
import {Injectable} from "@angular/core";
import {HttpService} from '../../http/http.service';

/**
 * Created by Guilherme on 10/04/2017.
 */

/**
 * Serviço que disponibiliza métodos crud para o ModuleDTO
 */
@Injectable()
export class UserCrudService extends BaseCrudService<UserDTO> {

  constructor() {
    super('/users')
  }

  public getColumns() : Array<ListColumn> {
    return [];
    // return [][{name:'code', title: 'Código', index:0},
    //         {name:'place', index:1},
    //         {name:'description', index:2},
    //         {name:'dateStart', index:3},
    //         {name:'dateEnd', index:4}];
  }

  public getActions() : Array<ListAction> {
    return [];
    // return [{name:'edit', index:0},
    //         {name:'delete', index:1}];
  }
}
