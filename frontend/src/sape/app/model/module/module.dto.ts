import {BaseDTO} from "../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */

export class ModuleDTO extends BaseDTO {

  code: number;
  name: String;
  description: String;
  prefix: String;
  basePackage: string;
}
