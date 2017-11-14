
export const MESSAGE_INFO = 'info';
export const MESSAGE_ERROR = 'error';
export const MESSAGE_WARNING = 'warning';
export const MESSAGE_SUCCESS = 'success';

export class Message {
    constructor(public code: number, public message: string, public messageDetail: string, public type:string) {} 
}