package sape.server.core.exception.error;

/**
 * Representa o erro da aplicação.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class ValidationError {

    private Long code;
    private String message;
    private String helpMessage;

    //
    public ValidationError(Long code, String message, String helpMessage) {
        this.code = code;
        this.message = message;
        this.helpMessage = helpMessage;
    }

    /**
     * Retorna o code - {@link Long}
     * @return {@link Long}
     */
    public Long getCode() {
        return code;
    }

    /**
     * Retorna o message - {@link String}
     * @return {@link String}
     */
    public String getMessage() {
        return message;
    }

    /**
     * Retorna o helpMessage - {@link String}
     * @return {@link String}
     */
    public String getHelpMessage() {
        return helpMessage;
    }
}