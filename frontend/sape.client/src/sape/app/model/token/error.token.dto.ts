import {BaseDTO} from "../base/base.dto";

/**
 * Represents the error returned when tried authenticate the token.
 */
export class ErrorTokenDTO extends BaseDTO {

  error: string = null;
  error_description:string = null;
}