import {BaseDTO} from "../base/base.dto";

/**
 * Created by Guilherme on 07/04/2017.
 */

export class TokenDTO extends BaseDTO {

  code: number = null;
  token: string = null;
  username: string = null;
  password: string = null;
  dateTimeGenerate: Date = null;
}
