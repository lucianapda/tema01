import {BaseDTO} from "../../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */
export class SubscriptionActivityDTO extends BaseDTO {

  code: number = null;
  date: Date = null;
  waitingList: boolean = null;
  idActivity: number = null;
  idSubscription: number = null;
}
