package sape.server.core.exception.crud;

import java.util.List;

import sape.server.core.exception.ValidationException;
import sape.server.core.exception.error.ValidationError;

/**
 * Exceção gerada a partir dos métodos CRUD.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class ValidationCRUDException extends ValidationException {

	/**
     * Constructs a new exception with the specified detail message.  The
     * cause is not initialized, and may subsequently be initialized by
     * a call to {@link #initCause}.
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public ValidationCRUDException(String message) {
        super(message);
    }

	/**
	 * Construtor de ValidationCRUDException
	 * <br />- <b>Data de criação:</b> 8 de jul de 2017
	 * @param errors
	 */
	public ValidationCRUDException(List<ValidationError> errors) {
		super(errors);
	}
}
