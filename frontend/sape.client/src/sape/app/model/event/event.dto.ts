import {BaseDTO} from "../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */

export class EventDTO extends BaseDTO {

  id: number = null;
  vesion: Date = null;
  code: number = null;
  place: String = "null";
  description: String = null;
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  dateStartSubscription: Date = new Date();
  dateEndSubscription: Date = new Date();
  vacancy: number = 0;
  waitingList: Boolean = false;
  idUser: number = null;
}
