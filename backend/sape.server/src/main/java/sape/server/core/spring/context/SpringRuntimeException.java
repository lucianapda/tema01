package sape.server.core.spring.context;

/**
 * Define exceções disparadas pela aplicação ligadas de alguma forma ao spring.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class SpringRuntimeException extends RuntimeException {

    /**
     * Constructs a new runtime exception with the specified detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause}.
     * @param message the detail message. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public SpringRuntimeException(String message) {
        super(message);
    }
}