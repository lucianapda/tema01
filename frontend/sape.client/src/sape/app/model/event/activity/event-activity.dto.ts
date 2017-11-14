import {BaseDTO} from "../../base/base.dto";
/**
 * Created by Guilherme on 10/04/2017.
 */
export class EventActivityDTO extends BaseDTO {

  code: number = null;
  description: string = null;
  speaker: string = null;
  theme: string = null;
  dateStart: Date = null;
  dateEnd: Date = null;
  vacancy: number = null;
  place: string = null;
  idEvent: number = null;
}
