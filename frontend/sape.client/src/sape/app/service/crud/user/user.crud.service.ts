
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
    super()
  }

  protected getPatch(): string {
    return "/users";
  }
}
