
/**
 * Representa as configurações possíveis para o componente modal.
 */
export interface ModalOptions {
    // Modal Settings
    detachable?:	boolean;//	If set to false will prevent the modal from being moved to inside the dimmer
    autofocus?:	boolean; //	When true, the first form input inside the modal will receive focus when shown. Set this to false to prevent this behavior.
    observeChanges?:	boolean; //	Whether any change in modal DOM should automatically refresh cached positions
    allowMultiple?:	boolean; //	If set to true will not close other visible modals when opening a new one
    keyboardShortcuts?:	boolean; //	Whether to automatically bind keyboard shortcuts
    offset?:	number; //	A vertical offset to allow for content outside of modal, for example a close button, to be centered.
    context?:	string; //	Selector or jquery object specifying the area to dim
    closable?:	boolean; //	Setting to false will not allow you to close the modal by clicking on the dimmer
    blurring? : boolean;
    inverted? : boolean;
    dimmerSettings?: 	
    {
      closable : false,
      useCSS   : true
    } //You can specify custom settings to extend UI dimmer
    transition?:	string ; //	Named transition to use when animating menu in and out, full list can be found in ui transitions docs.
    duration?:	number; //	Duration of animation
    queue?:	boolean; //	Whether additional animations should queue
    
    //Callbacks
    onShow?:	Function; //Is called when a modal starts to show.
    onVisible?:	Function; //Is called after a modal has finished showing animating.
    onHide?:	Function; // onHide($element) Modal	Is called after a modal starts to hide. If the function returns false, the modal will not hide.
    onHidden?:	Function; //Is called after a modal has finished hiding animation.
    onApprove?:	Function; // onApprove($element) Click	Is called after a positive, approve or ok button is pressed. If the function returns false, the modal will not hide.
    onDeny?:	Function; // onDeny($element) Is called after a negative, deny or cancel button is pressed. If the function returns false the modal will not hide.
  }  