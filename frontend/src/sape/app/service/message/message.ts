
export class Message {

  private message: string | String;

  constructor(message: string | String) {
    this.message = message;
  }

  public getMessage() : string | String {
    return this.message;
  }
}
