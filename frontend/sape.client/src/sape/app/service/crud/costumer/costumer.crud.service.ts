import { ListAction, ListColumn } from './../../../components/list/list.component';
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

  constructor() {
    super('/costumers ');  
  }

  public getColumns() : Array<ListColumn> {
    // return [{name:'code', index:0},
    //         {name:'place', index:1},
    //         {name:'description', index:2},
    //         {name:'dateStart', index:3},
    //         {name:'dateEnd', index:4}];
    return [];
  }

  public getActions() : Array<ListAction> {
    // return [{name:'edit', index:0},
    //         {name:'delete', index:1}];
    return [];
  }
}
