
/**
 * Interface que define modelo dos métodos para controle do modal.
 * 
 * @param T
 */
export interface ModalControl<T> {

    /**
     * Retorna a ação que será executada quando o modal for aprovado.
     */
    getModalApprove(value: T) : boolean;

    /**
     * Retorna a ação que será executada quando o modal for cancelado.
     */
    getModalDeny(value: T) : boolean;

    /**
     * Atirbui um valor ao controlador do modal.
     */
    setModalValue(value: T) : void;

    /**
     * Recupera o valor do controlador do modal.
     */
    getModalValue() : T;
}