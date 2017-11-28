package sape.server.crud.base.handle.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import sape.server.core.exception.ValidationException;
import sape.server.core.exception.crud.ValidationCRUDException;

/**
 * Controlador que intercepta exceções geradas nos controladores crud.
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@ControllerAdvice
public final class ValidationCRUDExceptionHandleController extends ResponseEntityExceptionHandler {


    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationCRUDException handleException(Exception ex) {
        return new ValidationCRUDException(ex.getMessage());
    }

    // Multiple exceptions can be handled
    @ExceptionHandler({ValidationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationException handleException(ValidationException ex) {
    	ValidationCRUDException validationCRUDException = new ValidationCRUDException(ex.getMessage());
    	validationCRUDException.getErrors().addAll(ex.getErrors());
		return validationCRUDException;
    }
}