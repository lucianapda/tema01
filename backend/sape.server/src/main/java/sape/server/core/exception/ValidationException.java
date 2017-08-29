package sape.server.core.exception;

import java.util.LinkedList;
import java.util.List;

import sape.server.core.exception.error.ValidationError;

/**
 * Exceção comum gerada a partir de qualquer local do sistema.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class ValidationException extends Exception {

    private List<ValidationError> errors = new LinkedList<>();

    /**
     * Constructs a new exception with {@code null} as its detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause}.
     */
    public ValidationException(List<ValidationError> errors) {
        this.errors = errors;
    }

    /**
     * Constructs a new exception with the specified detail message.  The
     * cause is not initialized, and may subsequently be initialized by
     * a call to {@link #initCause}.
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public ValidationException(String message) {
        super(message);
    }

    /**
     * Constructs a new exception with the specified detail message.  The
     * cause is not initialized, and may subsequently be initialized by
     * a call to {@link #initCause}.
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public ValidationException(Throwable throwable) {
        super(throwable);
    }

    /**
     * Retorna o errors - {@link List<ValidationError>}
     * @return {@link List<ValidationError>}
     */
    public List<ValidationError> getErrors() {
        return errors;
    }
}
