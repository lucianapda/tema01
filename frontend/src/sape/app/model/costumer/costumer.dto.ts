import {BaseDTO} from "../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */

export class CostumerDTO extends BaseDTO {

  code: number;
  name: String;
  email: String;
  cpf: String;
  cnpj: String;
  costumerType: String;
}
