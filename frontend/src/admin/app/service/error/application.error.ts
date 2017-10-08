export class ApplicationError {

  code: number;
  message: string;
  helpMessage: string;
  status: number;

  constructor(code: number, message: string, helpMessage: string, status: number) {
    this.code = code;
    this.message = message;
    this.helpMessage = helpMessage;
    this.status = status;
  }
}
