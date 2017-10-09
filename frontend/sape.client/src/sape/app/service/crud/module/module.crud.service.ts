
import {BaseCrudService} from "../base.crud";
import {ModuleDTO} from "../../../model/module/module.dto";
import {Injectable} from "@angular/core";
import {HttpService} from '../../http/http.service';

/**
 * Created by Guilherme on 10/04/2017.
 */

/**
 * Serviço que disponibiliza métodos crud para o ModuleDTO
 */
@Injectable()
export class ModuleCrudService extends BaseCrudService<ModuleDTO> {

  constructor(protected httpService: HttpService) {
    super(httpService)
  }

  protected getPatch(): string {
    return "/modules";
  }
}
