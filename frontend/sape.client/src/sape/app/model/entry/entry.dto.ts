import {BaseDTO} from "../base/base.dto";
import { PersonDTO } from '../person/person.dto';
/**
 * Created by Guilherme on 10/04/2017.
 */
export class EntryDTO extends BaseDTO {

  code: number = null;
  dateEntry: Date = null;
  dateDeparture: number = null;
  idSubscriptionActivity: number = null;
  descActivity: string = null;
  namePerson: string = null;
}
