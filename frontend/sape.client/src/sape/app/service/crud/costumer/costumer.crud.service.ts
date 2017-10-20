import {BaseCrudService} from "../base.crud";
import {Injectable} from "@angular/core";
import {CostumerDTO} from "../../../model/costumer/costumer.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */

/**
 * Serviço que disponibiliza métodos crud para o CostumerDTO
 */
@Injectable()
export class CostumerCrudService extends BaseCrudService<CostumerDTO> {

  protected getPatch(): string {
    return "/costumers";
  }
}
