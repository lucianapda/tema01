import {BaseDTO} from "../base/base.dto";

/**
 * Representa a check feito do token.
 */
export class CheckTokenDTO extends BaseDTO {

  active:Boolean = null;
  exp: number = null; 
  user_name:string = null;
  client_id: string = null;
  scope:string[] = null;
  
}