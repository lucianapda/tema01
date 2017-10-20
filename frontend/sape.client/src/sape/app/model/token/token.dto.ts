import {BaseDTO} from "../base/base.dto";

/**
 * Created by Guilherme on 07/04/2017.
 */

export class TokenDTO extends BaseDTO {

  access_token: string = null;
  expires_in: string = null;
  refresh_token: string = null;
  scope: string = null;
  token_type: string = null;
}
