import {BaseDTO} from "../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */

export class EventDTO extends BaseDTO {

  id: number;
  vesion: Date;
  code: number;
  place: String;
  description: String;
  dateStart: Date;
  dateEnd: Date;
  dateStartSubscription: Date;
  dateEndSubscription: Date;
  vacancy: number;
  waitingList: Boolean;
  idUser: number;
}
