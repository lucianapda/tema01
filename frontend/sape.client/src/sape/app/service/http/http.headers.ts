import {Headers} from "@angular/http";

/**
 * Created by Guilherme on 07/04/2017.
 */
export class HttpHeaders extends Headers {

  constructor() {
    super();
    this.set("Content-Type", "application/json")
  }
}
