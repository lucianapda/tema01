import {Headers} from "@angular/http";
/**
 * Created by Guilherme on 07/04/2017.
 */

export class HttpHeaders extends Headers {

  constructor() {
    super();
    this.append("Content-Type", "application/json");
    this.append("Accept", "application/json");
    this.append('Access-Control-Allow-Headers', 'Authorization');
    //this.append('Access-Control-Allow-Methods', '*');
    //this.append('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  }
}
