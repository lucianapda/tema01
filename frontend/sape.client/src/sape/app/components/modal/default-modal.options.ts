import { ModalOptions } from './modal.options';

export class DefaultModalOptions implements ModalOptions {

    detachable = true;
    autofocus = true;
    observeChanges = false;
    allowMultiple = false;
    keyboardShortcuts = true;
    offset = 0;
    context = 'body';
    closable = false;
    inverted = false;
    blurring = true;
    transition = 'fade';
    duration = 400;
    queue = false;
    onDeny = function(){
        console.log('Deny!');
        return false;
    };
    onApprove = function() {
        console.log('Approved!');
    };
}