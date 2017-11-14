import { Injectable } from '@angular/core';

@Injectable()
export class MenuSideBarService {

    private onOpen: Function = () => {};
    private onClose: Function = () => {};

    public registerOnOpen(fn: Function) {
        this.onOpen = fn;
    }

    public registerOnClose(fn: Function) {
        this.onClose = fn;
    }

    public executeOnOpen() {
        this.onOpen ();
    }

    public executeOnClose() {
        this.onClose();
    }
}