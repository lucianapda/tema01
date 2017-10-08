import {Message} from './message';

export class MessageErro extends Message{
    private error: any;

    constructor(message: string | String, error: any) {
      super(message);
      this.error = error;
    }

    public getError(): any {
      return this.error;
    }
}
