import { SubscriptionActivityDTO } from './activity/subscription-activity.dto';
import {BaseDTO} from "../base/base.dto";
import { PersonDTO } from '../person/person.dto';
/**
 * Created by Guilherme on 10/04/2017.
 */
export class SubscriptionDTO extends BaseDTO {

  code: number = null;
  date: Date = null;
  idPerson: number = null;
  namePerson: string = null;
  activities: Array<number> = [];

  // loaded ondemand
  person: PersonDTO = null;
}
