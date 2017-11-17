import {BaseDTO} from "../base/base.dto";
import { PersonContactDTO } from "./contact/person-contact.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */
export class PersonDTO extends BaseDTO {

  code: number;
	name: string;
  birthDate: Date;
	cpf: string;
  contacts: Array<PersonContactDTO> = [];
}
